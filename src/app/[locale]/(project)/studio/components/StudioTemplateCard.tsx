"use client"

import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

import {
	ChartIcon,
	ChartPieIcon,
	HeadphoneIcon,
	Logo,
	PersonalPortfolioIcon,
	VoiceIcon
} from "@/components/icons"
import { Button, Skeleton } from "@/components/ui"
import { cn } from "@/lib/utils"
import { isEmpty } from "lodash"

import useChatStore from "@/stores/chat.store"
import useGetAllMatPrd from "@/hooks/MultiAgentTeam/useGetAllMatPrd"
import useGetMatMainPrd from "@/hooks/MultiAgentTeam/useGetMainMatPrd"

const StudioTemplateCard = () => {
	const t = useTranslations("studio")
	const [shouldHide, setShouldHide] = useState(false)
	const [hasPrd, setHasPrd] = useState(false)

	const searchParams = useSearchParams()
	const matId = searchParams.get("matId") || ""
	const sessionId = searchParams.get("sessionId") || ""

	const { messages } = useChatStore()
	const hasMessages = messages && messages.length > 0

	const readyToHide = hasMessages || hasPrd

	const { data: prds } = useGetAllMatPrd(matId, sessionId)
	const { data: mainPrd } = useGetMatMainPrd(matId, sessionId)

	useEffect(() => {
		if (readyToHide) {
			const timeout = setTimeout(() => {
				setShouldHide(true)
				clearTimeout(timeout)
			}, 1000)
		}
	}, [readyToHide])

	useEffect(() => {
		if (!prds || !mainPrd) return

		if (!isEmpty(prds.prd_files) || !isEmpty(mainPrd.prd_data)) setHasPrd(true)
	}, [prds, mainPrd])

	if (shouldHide) return null

	return (
		<div
			className={cn(
				"flex flex-col pt-10 items-center z-10 transition-all h-full delay-500",
				readyToHide && "animate-height-reduce  !pt-0"
			)}
		>
			<div
				className={cn(
					"transition-all duration-500 flex flex-col items-center",
					readyToHide && "animate-fade-down"
				)}
			>
				<Logo />
				<p className="text-[28px] font-medium leading-8 mt-10">
					{t("buildSomethingGreat")}
				</p>
				<p className="text-sm text-alphii_text_sub_600">
					{t("pickTemplateDescription")}
				</p>
			</div>

			<div className="mt-10 flex flex-col gap-5">
				<div
					className={cn(
						"flex gap-5 items-center transition-all duration-500",
						readyToHide && "animate-fade-left"
					)}
				>
					<div className="w-[150px] h-[100px] bg-alphii_bg_weak_40 flex items-center justify-center rounded-[20px] border dark:border-0 border-alphii_border">
						<PersonalPortfolioIcon />
					</div>
					<div>
						<p className="font-semibold">{t("personalPortfolioTitle")}</p>
						<p className="text-alphii_text_sub_600 text-sm">
							{t("pickTemplateDescription")}
						</p>
					</div>
				</div>
				<div
					className={cn(
						"flex gap-5 items-center transition-all duration-500",
						readyToHide && "animate-fade-right"
					)}
				>
					<div className="w-[150px] h-[100px] bg-alphii_bg_weak_40 flex items-center justify-center rounded-[20px] border dark:border-0 border-alphii_border">
						<Skeleton className="w-16 h-[60px] rounded-lg px-1.5 py-2.5 shadow-lg relative">
							<Skeleton className="bg-primary w-2.5 h-2.5 rounded-full" />
							<div className="w-6 h-6 bg-foreground text-background border-[2.27px] border-alphii_skeleton shadow-lg rotate-[14deg] flex items-center justify-center rounded-full absolute -top-1 -right-1">
								<VoiceIcon />
							</div>
							<div className="w-8 h-8 bg-primary border-[2.27px] border-alphii_skeleton shadow-lg -rotate-[14deg] flex items-center justify-center rounded-full absolute -bottom-1.5 -left-1.5">
								<HeadphoneIcon />
							</div>
						</Skeleton>
					</div>
					<div>
						<p className="font-semibold">{t("flashcardAppTitle")}</p>
						<p className="text-alphii_text_sub_600 text-sm">
							{t("pickTemplateDescription")}
						</p>
					</div>

					<Button
						variant="ghost"
						className="w-[72px] h-9 bg-foreground text-background hover:bg-foreground/50 hover:text-background rounded-xl"
					>
						{t("startButton")}
					</Button>
				</div>
				<div
					className={cn(
						"flex gap-5 items-center transition-all duration-500",
						readyToHide && "animate-fade-left"
					)}
				>
					<div className="w-[150px] h-[100px] bg-alphii_bg_weak_40 flex items-center justify-center rounded-[20px] border dark:border-0 border-alphii_border">
						<Skeleton className="w-16 h-[60px] rounded-lg px-1.5 py-2.5 shadow-lg relative">
							<div className="w-6 h-6 bg-foreground text-background border-[2.27px] border-alphii_skeleton shadow-lg rotate-[14deg] flex items-center justify-center rounded-full absolute -top-1 -right-1">
								<ChartIcon />
							</div>
							<div className="w-8 h-8 bg-green-400  border-[2.27px] border-alphii_skeleton shadow-lg -rotate-[14deg] flex items-center justify-center rounded-full absolute -bottom-1.5 -left-1.5">
								<ChartPieIcon />
							</div>
						</Skeleton>
					</div>
					<div>
						<p className="font-semibold">{t("salesDashboardTitle")}</p>
						<p className="text-alphii_text_sub_600 text-sm">
							{t("pickTemplateDescription")}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudioTemplateCard
