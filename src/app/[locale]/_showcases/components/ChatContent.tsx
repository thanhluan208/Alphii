import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { MATMessageType, MATNewMessage } from "@/types/mat.type"
import { isEmpty } from "lodash"

import useFileStore from "@/stores/fileStore"
import useSocketStore from "@/stores/socket.store"

import Chatbox from "./Chatbox"
import Loading from "./Loading"

const ChatContent = () => {
	const { socket } = useSocketStore()
	const containerRef = useRef<HTMLDivElement>(null)
	const currentFileIndex = useRef<number>(0)

	const { setLoading, addFile, setCurrentFile, messages, setMessages } =
		useFileStore()

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
	}, [socket])

	return (
		<div
			ref={containerRef}
			className={cn(
				"h-[calc(100%-150px)] w-full transition-all duration-500 delay-500 flex flex-col gap-3 max-h-[calc(100%-150px)] py-4 px-5 overflow-y-auto no-scrollbar"
			)}
		>
			{!isEmpty(messages) &&
				messages.map((msg) => {
					return <Chatbox key={msg.id} {...msg} />
				})}

			<Loading />
		</div>
	)
}

export default ChatContent
