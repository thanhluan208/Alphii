"use client"

import { useEffect } from "react"
import Image from "next/image"

import ChatContent from "@/components/common/Chat/ChatContent"
import ChatInput from "@/components/common/Chat/ChatInput"
import { WS_URL } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { MATMessageType } from "@/types/mat.type"

import useSocketStore from "@/stores/socket.store"

import Header from "./Header"
import PrdSelector from "./prd-selector"
import Preview from "./preview/Preview"
import StudioTemplateCard from "./StudioTemplateCard"

interface StudioPageProps {
	matId: string
	sessionId: string
}

const StudioPage = ({ matId, sessionId }: StudioPageProps) => {
	const setWebSocket = useSocketStore((state) => state.setWebSocket)

	useEffect(() => {
		const ws = new WebSocket(
			`${WS_URL}/multi_agent_team/session/behaviour/start_session/${matId}/${sessionId}`
		)

		ws.addEventListener("open", () => {
			ws.send(
				JSON.stringify({
					type: MATMessageType.RECEIVE_INFO,
					data: {
						status: "success"
					}
				})
			)
		})

		setWebSocket(ws)

		return () => {
			ws.send(
				JSON.stringify({
					type: MATMessageType.END_SESSION,
					data: {}
				})
			)
			ws.close()
		}
	}, [matId, sessionId, setWebSocket])

	return (
		<div className="px-5 flex relative flex-col flex-1 w-full ">
			<Header />

			<Image
				src="/images/project/project-bg.png"
				fill
				priority
				alt="bg"
				className="absolute !top-2/4 !left-2/4 opacity-10 dark:invert dark:opacity-20 object-cover !-translate-x-2/4 !-translate-y-2/4 !w-3/4 !h-3/4"
			/>

			<div
				className={cn(
					"flex w-full items-end h-[calc(100vh-72px)] min-w-[1220px] pb-5 z-10"
				)}
			>
				<div className="relative pb-5 flex h-full flex-1 flex-col items-center ">
					{/* <StudioTemplateCard /> */}

					{/* <ChatContent /> */}

					{/* <PrdSelector /> */}

					<ChatInput />
				</div>
				<Preview />
			</div>
		</div>
	)
}

export default StudioPage
