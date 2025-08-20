import React, { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

import { SpinIcon } from "@/components/icons"
import { Button } from "@/components/ui"
import { AnimatedPRD } from "@/components/ui/animated-prd"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ChatType } from "@/types"
import { MATMessageType, PrdFileContent } from "@/types/mat.type"
import { isEmpty } from "lodash"

import useChatStore from "@/stores/chat.store"
import useSocketStore from "@/stores/socket.store"
import useGetAllMatPrd from "@/hooks/MultiAgentTeam/useGetAllMatPrd"
import useMultiAgentTeamMutation from "@/hooks/MultiAgentTeam/useMATMutation"

const PrdSelector = () => {
	const t = useTranslations("studio.prdSelector")
	const [selectedPrd, setSelectedPrd] = useState<PrdFileContent>()

	const searchParams = useSearchParams()
	const matId = searchParams.get("matId") || ""
	const sessionId = searchParams.get("sessionId") || ""

	const { data: prds } = useGetAllMatPrd(matId, sessionId)
	const { selectMainPrd, getMainPrdIdea } = useMultiAgentTeamMutation()

	const socket = useSocketStore((state) => state.socket)
	const setMessages = useChatStore((state) => state.setMessages)
	const setLoading = useChatStore((state) => state.setLoading)

	const isSelecting = selectMainPrd.isPending

	const listPrd = useMemo(() => {
		if (!prds || !prds?.prd_files) return []

		return Object.entries(prds?.prd_files).map(([key, value]) => {
			return {
				content: value,
				name: key
			}
		})
	}, [prds])

	const handelConfirmMainPrd = async () => {
		if (!matId || !sessionId || !selectedPrd?.name) return

		await selectMainPrd.mutateAsync({
			mat_id: matId,
			session_id: sessionId,
			prd_id: selectedPrd?.name
		})

		const prdIdeaResponse = await getMainPrdIdea.mutateAsync({
			mat_id: matId,
			session_id: sessionId
		})

		const prdIdea = prdIdeaResponse.idea

		if (prdIdea && socket) {
			socket.send(
				JSON.stringify({
					type: MATMessageType.NEW_MESSAGE,
					data: {
						message: prdIdea,
						send_to: ""
					}
				})
			)

			setMessages({
				type: ChatType.PRD,
				id: new Date().getTime().toString(),
				content: selectedPrd.content,
				name: "Me",
				isUser: true
			})

			setLoading({
				name: "",
				isLoading: true
			})
		}
	}

	useEffect(() => {
		return () => {
			setSelectedPrd(undefined)
		}
	}, [])

	if (getMainPrdIdea?.data?.idea) return null

	return (
		<div
			className={cn(
				"w-full z-10 absolute top-0 left-0 h-[calc(100%-125px)] mx-auto transition-all delay-1000 opacity-0 flex flex-col gap-3 max-h-[calc(100%-125px)] overflow-y-auto no-scrollbar",
				!isEmpty(prds?.prd_files) && "relative py-4 opacity-100"
			)}
		>
			{!isEmpty(prds?.prd_files) && (
				<AnimatedPRD
					prds={listPrd}
					className="w-[calc(100vw-200px)]"
					onSelectPrd={(prd) => setSelectedPrd(prd)}
				/>
			)}

			<Dialog
				open={!!selectedPrd}
				onOpenChange={(open) => {
					if (!open) setSelectedPrd(undefined)
				}}
			>
				<DialogContent className="max-w-[unset] w-[calc(100vw-100px)] h-[calc(100vh-100px)] rounded-lg bg-alphii_background_2">
					<DialogHeader>
						<DialogTitle>{t("dialogTitle")}</DialogTitle>
						<DialogDescription>{t("dialogDescription")}</DialogDescription>
					</DialogHeader>

					<div className="max-h-full overflow-y-auto">
						<ReactMarkdown>{selectedPrd?.content}</ReactMarkdown>
					</div>

					<DialogFooter>
						<div className="flex gap-3">
							<Button
								className="w-32"
								variant="secondary"
								disabled={isSelecting}
								onClick={() => setSelectedPrd(undefined)}
							>
								{t("cancelButton")}
							</Button>
							<Button
								disabled={isSelecting}
								onClick={handelConfirmMainPrd}
								className="w-32"
							>
								{isSelecting ? <SpinIcon /> : t("confirmButton")}
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default PrdSelector
