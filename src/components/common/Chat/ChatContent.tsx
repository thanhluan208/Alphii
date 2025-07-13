"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { ChatType } from "@/types"
import { MATMessageType, MATNewMessage } from "@/types/mat.type"
import dayjs from "dayjs"
import { isEmpty } from "lodash"

import useChatStore from "@/stores/chat.store"
import useSocketStore from "@/stores/socket.store"

import Chatbox, { ChatboxProps } from "./Chatbox"
import DeepThinking, { Deepthink } from "./deepthink/DeepThinking"
import Loading from "./Loading"

const ChatContent = () => {
	const { socket } = useSocketStore()
	const containerRef = useRef<HTMLDivElement>(null)
	const currentFileIndex = useRef<number>(0)
	const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true)
	const [userScrollTimeout, setUserScrollTimeout] =
		useState<NodeJS.Timeout | null>(null)
	const lastScrollTop = useRef(0)

	const {
		setLoading,
		addFile,
		setCurrentFile,
		messages,
		setMessages,
		clearStore,
		viewDetail,
		updateDeepthinkContent,
		updateFinishDeepThink
	} = useChatStore()

	// Smooth scroll to bottom function
	const scrollToBottom = useCallback(() => {
		if (containerRef.current && isAutoScrollEnabled) {
			const element = containerRef.current
			element.scrollTo({
				top: element.scrollHeight,
				behavior: "smooth"
			})
		}
	}, [isAutoScrollEnabled])

	// Check if user is near bottom of scroll
	const isNearBottom = useCallback(() => {
		if (!containerRef.current) return true
		const element = containerRef.current
		const threshold = 50 // pixels from bottom
		return (
			element.scrollTop + element.clientHeight >=
			element.scrollHeight - threshold
		)
	}, [])

	// Handle scroll events to detect user scroll behavior
	const handleScroll = useCallback(() => {
		if (!containerRef.current) return

		const element = containerRef.current
		const currentScrollTop = element.scrollTop
		const maxScrollTop = element.scrollHeight - element.clientHeight

		// Check if user is scrolling up
		const isScrollingUp = currentScrollTop < lastScrollTop.current

		// If user scrolled up and we're not near the bottom, pause auto-scroll
		if (isScrollingUp && !isNearBottom()) {
			setIsAutoScrollEnabled(false)

			// Clear existing timeout
			if (userScrollTimeout) {
				clearTimeout(userScrollTimeout)
			}

			// Set new timeout to resume auto-scroll after 3 seconds
			const timeout = setTimeout(() => {
				setIsAutoScrollEnabled(true)
			}, 3000)

			setUserScrollTimeout(timeout)
		}

		// If user scrolled to bottom manually, resume auto-scroll immediately
		if (isNearBottom()) {
			setIsAutoScrollEnabled(true)
			if (userScrollTimeout) {
				clearTimeout(userScrollTimeout)
				setUserScrollTimeout(null)
			}
		}

		lastScrollTop.current = currentScrollTop
	}, [userScrollTimeout, isNearBottom])

	// Auto-scroll when messages change and auto-scroll is enabled
	useEffect(() => {
		if (!isAutoScrollEnabled || !containerRef.current || isEmpty(messages))
			return

		// Small delay to ensure content is rendered
		const timer = setTimeout(() => {
			scrollToBottom()
		}, 50)

		return () => clearTimeout(timer)
	}, [messages, isAutoScrollEnabled, scrollToBottom])

	// Check if container needs scrolling
	const shouldAutoScroll = useCallback(() => {
		if (!containerRef.current) return false
		const element = containerRef.current
		return element.scrollHeight > element.clientHeight
	}, [])

	// Continuous auto-scroll check with 100ms interval
	useEffect(() => {
		if (!isAutoScrollEnabled) return

		const interval = setInterval(() => {
			if (shouldAutoScroll() && isAutoScrollEnabled) {
				scrollToBottom()
			}
		}, 100) // Check every 100ms

		return () => clearInterval(interval)
	}, [isAutoScrollEnabled, scrollToBottom, shouldAutoScroll])

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (userScrollTimeout) {
				clearTimeout(userScrollTimeout)
			}
		}
	}, [userScrollTimeout])

	useEffect(() => {
		if (socket) {
			socket.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data) as MATNewMessage

					if (message.type === MATMessageType.NEW_MESSAGE) {
						if (!isEmpty(message.data.messages.team)) {
							message.data.messages.team.forEach((elm) => {
								const sendTo = elm?.send_to.filter((elm) => elm !== "<all>")

								setMessages({
									type: ChatType.NORMAL,
									id: elm.id,
									content: elm.content,
									name: elm.sent_from,
									isUser: false,
									from: elm.sent_from,
									to: sendTo.join(", ")
								})
							})
						}

						Object.entries(message.data.messages.roles).forEach(
							([agent, agentInfo]) => {
								if (!agentInfo.thinking) {
									updateFinishDeepThink(agent)
								} else {
									const [initThinkingInfo, ...rest] = agentInfo.messages

									updateDeepthinkContent(agent, initThinkingInfo.content)

									rest.forEach((elm, index) => {
										const time = setTimeout(() => {
											updateDeepthinkContent(agent, elm.content)
											clearTimeout(time)
										}, index)
									})
								}
							}
						)

						if (!isEmpty(message.data.files)) {
							addFile(message.data.files, currentFileIndex.current)
							setCurrentFile(
								message.data.files[message.data.files.length - 1].fullPath,
								true
							)
							currentFileIndex.current++
						}

						for (const agent of Object.entries(message.data.messages.roles)) {
							if (agent[1].thinking) {
								setLoading({
									name: agent[0],
									isLoading: true
								})
							}
						}
					}

					if (
						message.type === MATMessageType.STATUS &&
						message.data.round !== undefined
					) {
						socket.send(
							JSON.stringify({
								type: MATMessageType.RECEIVE_STATUS,
								data: {
									status: "success"
								}
							})
						)

						socket.send(
							JSON.stringify({
								type: MATMessageType.VISUALIZE,
								data: {
									round: message.data.round,
									status: "done"
								}
							})
						)
					}

					if (message.type == MATMessageType.IDLE) {
						setLoading({
							name: "",
							isLoading: false
						})
					}
				} catch (err) {
					console.error("Failed to parse message:", err)
				}
			}
		}
	}, [
		socket,
		addFile,
		setCurrentFile,
		setLoading,
		setMessages,
		updateDeepthinkContent,
		updateFinishDeepThink
	])

	useEffect(() => {
		return () => {
			console.log("clearstore")
			clearStore()
		}
	}, [clearStore])

	if (isEmpty(messages)) return null

	return (
		<div
			ref={containerRef}
			className={cn(
				"h-0 w-full z-10 max-w-[744px] mx-auto transition-all delay-1000 opacity-0 flex flex-col gap-3 max-h-[calc(100%-250px)] overflow-y-auto no-scrollbar",
				!isEmpty(messages) && "h-[calc(100%-250px)] py-4 opacity-100",
				viewDetail && "max-h-[calc(100%-125px)] h-[calc(100%-125px)]"
			)}
			onScroll={handleScroll}
		>
			{!isEmpty(messages) &&
				messages.map((msg, index) => {
					if (msg.type === ChatType.DEEPTHINK)
						return <DeepThinking key={msg.id} {...(msg as Deepthink)} />
					return <Chatbox key={msg.id} {...(msg as ChatboxProps)} />
				})}

			<Loading />
		</div>
	)
}

export default memo(ChatContent)
