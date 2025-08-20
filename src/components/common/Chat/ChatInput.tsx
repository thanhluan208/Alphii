"use client"

import { useCallback, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

import {
	ExpandIcon,
	MonitorIcon,
	PromptIcon,
	SpinIcon
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import GradientBorderCard from "@/components/ui/gradient-border-card"
import { usePathname, useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { ChatType } from "@/types"
import { MATMessageType } from "@/types/mat.type"
import { isEmpty } from "lodash"
import { ArrowUp, AtSign } from "lucide-react"

import useChatStore from "@/stores/chat.store"
import useSocketStore from "@/stores/socket.store"
import useGetMatMainPrd from "@/hooks/MultiAgentTeam/useGetMainMatPrd"
import useMultiAgentTeamMutation from "@/hooks/MultiAgentTeam/useMATMutation"

const ChatInput = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const prompt = searchParams.get("prompt")
	const matId = searchParams.get("matId") || ""
	const sessionId = searchParams.get("sessionId") || ""

	const { data: mainPrd, isLoading: isLoadingMainPrd } = useGetMatMainPrd(
		matId,
		sessionId
	)

	const { generateMATPrds } = useMultiAgentTeamMutation()

	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const socket = useSocketStore((state) => state.socket)
	const { setMessages, loading, setLoading, viewDetail, setViewDetail } =
		useChatStore()

	const disableSubmit = !matId || !sessionId || isLoadingMainPrd
	const isSelectPrd = !isEmpty(mainPrd?.prd_data)
	const buttonLoading = loading.isLoading || generateMATPrds.isPending

	const handleChat = useCallback(() => {
		if (!socket || !textareaRef.current?.value) return

		const prompt = textareaRef.current?.value

		setMessages({
			type: ChatType.NORMAL,
			id: new Date().getTime().toString(),
			content: prompt,
			name: "Me",
			isUser: true
		})

		setLoading({
			name: "",
			isLoading: true
		})

		socket.send(
			JSON.stringify({
				type: MATMessageType.NEW_MESSAGE,
				data: {
					message: prompt,
					send_to: ""
				}
			})
		)

		textareaRef.current.value = ""
	}, [socket, setMessages, setLoading])

	const handleGeneratePrds = useCallback(async () => {
		if (!matId || !sessionId || !textareaRef.current?.value) return

		const response = await generateMATPrds.mutateAsync({
			mat_id: matId,
			session_id: sessionId,
			user_prompt: textareaRef.current.value
		})

		textareaRef.current.value = ""

		console.log(response)
	}, [matId, sessionId, generateMATPrds])

	const handleSubmit = useCallback(() => {
		if (isSelectPrd) {
			handleChat()
		} else {
			handleGeneratePrds()
		}
	}, [handleChat, isSelectPrd, handleGeneratePrds])

	useEffect(() => {
		if (prompt && textareaRef.current) {
			textareaRef.current.value = prompt

			const newSearch = new URLSearchParams(searchParams)
			if (newSearch.has("prompt")) {
				newSearch.delete("prompt")
				router.replace(pathname + `?${newSearch.toString()}`)
			}
		}
	}, [prompt, pathname, searchParams, router])

	return (
		<GradientBorderCard
			className={cn(
				"w-[744px] absolute bottom-2 group mx-auto h-[120px] min-h-[120px] z-10 rounded-3xl shadow-lg p-[1px] dark:bg-[linear-gradient(90deg,#373737_0%,#5C5C5C_50%,#373737_100%)] focus-within:!bg-none focus-within:bg-alphii_border transition-all",
				loading.isLoading &&
					"p-[2px] !bg-[linear-gradient(90deg,#9280FF_0%,#FFFFFF_50%,#9280FF_100%)]",
				viewDetail && "w-[523px]"
			)}
		>
			{!viewDetail && (
				<div
					className={cn(
						"absolute left-[3px] opacity-0 flex justify-between overflow-hidden items-end w-[calc(100%-6px)] pb-5 px-4 -translate-y-[calc(100%-10px)] h-[6px] bg-[linear-gradient(180deg,rgba(73,42,195,0)_39.42%,rgba(73,42,195,0.35)_100%)] transition-all",
						loading.isLoading && "h-[116px] opacity-100"
					)}
				>
					<div className="flex gap-1 items-center">
						<MonitorIcon className="text-primary" />
						<p>See what the members are working on...</p>
					</div>
					<button
						onClick={() => {
							setViewDetail(true)
						}}
						className="w-[138px] cursor-pointer hover:shadow-xl bg-white/20 h-20 rounded-lg flex justify-end px-2 py-2 border border-alphii_border"
					>
						<ExpandIcon />
					</button>
				</div>
			)}
			<div
				className={cn(
					"absolute top-0.5 z-10 left-0.5 p-3 h-[calc(100%-4px)] w-[calc(100%-4px)] transition-all flex justify-between flex-col  bg-alphii_bg_weak_50 rounded-[22px]",
					loading.isLoading &&
						"top-[2px] left-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)]"
				)}
			>
				<textarea
					ref={textareaRef}
					defaultValue="Build a landing page for a UK travel agency showcasing destinations and booking services"
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

					<Button
						variant="ghost"
						onClick={handleSubmit}
						disabled={buttonLoading || disableSubmit}
						className="rounded-full  bg-alphii_component_3 w-8 h-8 p-0 dark:group-focus-within:bg-foreground dark:group-focus-within:text-background flex items-center justify-center transition-colors shadow-xl"
					>
						{buttonLoading ? <SpinIcon /> : <ArrowUp />}
					</Button>
				</div>
			</div>
			<p className="w-full absolute -bottom-5 text-xs text-center text-alphii_text_sub_600 opacity-40">
				Alphii AI can make mistakes
			</p>
		</GradientBorderCard>
	)
}

export default ChatInput
