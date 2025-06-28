"use client"

import { memo, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { ChatType } from "@/types"
import { MATMessageType, MATNewMessage } from "@/types/mat.type"
import { isEmpty, set } from "lodash"

import useChatStore from "@/stores/fileStore"
import useSocketStore from "@/stores/socket.store"

import Chatbox, { ChatboxProps } from "./Chatbox"
import DeepThinking from "./DeepThinking"
import Loading from "./Loading"

const ChatContent = () => {
	const { socket } = useSocketStore()
	const containerRef = useRef<HTMLDivElement>(null)
	const currentFileIndex = useRef<number>(0)

	const {
		setLoading,
		addFile,
		setCurrentFile,
		messages,
		setMessages,
		clearStore,
		viewDetail
	} = useChatStore()

	useEffect(() => {
		if (socket) {
			socket.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data) as MATNewMessage

					if (message.type === MATMessageType.NEW_MESSAGE) {
						if (message.data.messages.team?.[0]) {
							const sendTo = message?.data?.messages?.team?.[0]?.send_to.filter(
								(elm) => elm !== "<all>"
							)

							setMessages({
								type: ChatType.NORMAL,
								id: message.data.messages.team[0].id,
								content: message.data.messages.team[0].content,
								name: message.data.messages.team[0].sent_from,
								isUser: false,
								from: message.data.messages.team[0].sent_from,
								to: sendTo.join(", ")
							})
						}
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
	}, [socket, addFile, setCurrentFile, setLoading, setMessages])

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
		>
			{!isEmpty(messages) &&
				messages.map((msg, index) => {
					if (msg.type === ChatType.DEEPTHINK)
						return <DeepThinking key={msg.id} {...msg} />
					return <Chatbox key={msg.id} {...(msg as ChatboxProps)} />
				})}

			<Loading />
		</div>
	)
}

export default memo(ChatContent)
