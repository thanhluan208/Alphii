import React, { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"

import { cn, extractMessage } from "@/lib/utils"
import { MATMessageType, MATNewMessage } from "@/types/mat.type"
import { cloneDeep } from "lodash"

import useSocketStore from "@/stores/socket.store"

import Chatbox, { ChatboxProps } from "./Chatbox"

const ChatContent = () => {
	const { socket } = useSocketStore()
	const searchParams = useSearchParams()
	const prompt = searchParams.get("prompt")
	const containerRef = useRef<HTMLDivElement>(null)

	const [messages, setMessages] = useState<ChatboxProps[]>([])

	useEffect(() => {
		if (socket) {
			socket.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data) as MATNewMessage

					console.log(message, message.type === MATMessageType.NEW_MESSAGE)
					if (message.type === MATMessageType.NEW_MESSAGE) {
						Object.entries(message.data.messages.roles).forEach(
							([key, value]) => {
								value.forEach((agentContent) => {
									setMessages((prev) => {
										if (prev.some((elm) => elm.id === agentContent.id)) {
											return prev
										}

										const newPrev = cloneDeep(prev)

										newPrev.push({
											id: agentContent.id,
											content: agentContent.content,
											name: agentContent.role === "user" ? "Me" : key,
											isUser: agentContent.role === "user"
										})

										return newPrev
									})
								})
							}
						)
					}

					if (
						message.type === MATMessageType.STATUS &&
						message.data.status === "done"
					) {
						socket.send(
							JSON.stringify({
								type: MATMessageType.RECEIVE_STATUS,
								data: {
									status: "success"
								}
							})
						)
					}
				} catch (err) {
					console.error("Failed to parse message:", err)
				}
			}
		}
	}, [socket])

	console.log("messages", messages)

	return (
		<div
			ref={containerRef}
			className={cn(
				"h-0 w-full transition-all duration-500 delay-500 flex flex-col gap-3 max-h-[calc(100%-220px)] overflow-y-auto no-scrollbar",
				prompt && "h-[calc(100%-220px)]"
			)}
		>
			{messages.map((msg) => {
				return <Chatbox key={msg.id} {...msg} />
			})}
		</div>
	)
}

export default ChatContent
