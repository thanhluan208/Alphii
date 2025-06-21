"use client"

import React, { useRef } from "react"

import { PromptIcon, TokenIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import GradientBorderCard from "@/components/ui/gradient-border-card"
import { MATMessageType } from "@/types/mat.type"
import { ArrowUp, AtSign } from "lucide-react"

import useFileStore from "@/stores/fileStore"
import useSocketStore from "@/stores/socket.store"

const ChatInput = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const { socket, setWebSocket } = useSocketStore()
	const { setMessages, setLoading, loading } = useFileStore()

	const handleSubmit = async () => {
		if (!textareaRef.current?.value) return

		const prompt = textareaRef.current?.value

		setMessages({
			id: new Date().getTime().toString(),
			content: prompt,
			name: "Me",
			isUser: true
		})

		setLoading({
			name: "",
			isLoading: true
		})

		if (socket) {
			console.log("sending new prompt", prompt)
			socket.send(
				JSON.stringify({
					type: MATMessageType.NEW_MESSAGE,
					data: {
						message: prompt,
						send_to: ""
					}
				})
			)

			setMessages({
				id: new Date().getTime().toString(),
				content: prompt,
				name: "Me",
				isUser: true
			})

			setLoading({
				name: "",
				isLoading: true
			})

			textareaRef.current.value = ""

			return
		}

		const ws = new WebSocket(
			`ws://helped-dragon-entirely.ngrok-free.app/multi_agent_team/session/behaviour/start_session/25be228d-e74b-4f14-9974-c86cb552eca9/5aa1c28a8de342d798f49fa0baf0fb47`
		)

		ws.addEventListener("open", () => {
			console.log("Connected to WebSocket")
			ws.send(
				JSON.stringify({
					type: MATMessageType.RECEIVE_INFO,
					data: {
						status: "success"
					}
				})
			)

			ws.send(
				JSON.stringify({
					type: MATMessageType.NEW_MESSAGE,
					data: {
						message: prompt,
						send_to: ""
					}
				})
			)
		})

		setWebSocket(ws)
		textareaRef.current.value = ""
	}

	return (
		<GradientBorderCard className="p-[3px] mt-4 w-[calc(100%-50px)] mx-auto h-[120px] rounded-3xl ">
			<div className="absolute top-[3px] left-[3px] p-3 h-[calc(100%-6px)] flex justify-between flex-col w-[calc(100%-6px)] bg-alphii_bg_weak_50 rounded-[21px]">
				<textarea
					ref={textareaRef}
					disabled={loading?.isLoading}
					className="w-full bg-transparent disabled:bg-transparent hover:bg-transparent placeholder:text-[#62636C] focus-visible:outline-none resize-none min-h-5 h-[50px] overflow-y-auto"
					placeholder="Tell us what you're building. We'll help you assign the team to build"
				/>

				<div className="flex items-center justify-between">
					<div className="flex gap-2 text-sm">
						<div className="rounded-full flex gap-1 px-2.5 items-center py-0.5 border border-alphii_border">
							<AtSign className="text-[#80828D] h-4 w-4" />
							<p className="font-[500]">Mention</p>
						</div>
						<div className="rounded-full flex gap-1 px-2.5 items-center py-0.5 border border-alphii_border">
							<PromptIcon className="text-[#80828D]" />
							<p className="font-[500]">Prompt Library</p>
						</div>
					</div>

					<div className="bg-[linear-gradient(167.91deg,rgba(218,218,218,0.55)_7.43%,rgba(232,232,232,0.55)_49.31%,rgba(196,196,196,0.55)_91.18%)] rounded-full p-0.5 flex items-center gap-1 ">
						<div className="border border-alphii_border px-3 py-0.5 h-8 rounded-full flex items-center gap-1 bg-background">
							<TokenIcon />
							<p className="text-sm font-[500]">213</p>
						</div>

						<Button
							variant="ghost"
							disabled={loading?.isLoading}
							onClick={handleSubmit}
							className="rounded-full text-white hover:text-white w-8 h-8 p-0 flex items-center justify-center border border-white bg-[linear-gradient(124.94deg,#B7C0FF_-3.78%,#3B54FF_29.53%,#EA8CFF_62.84%,#7485FF_96.14%)]"
						>
							{<ArrowUp />}
						</Button>
					</div>
				</div>
			</div>
		</GradientBorderCard>
	)
}

export default ChatInput
