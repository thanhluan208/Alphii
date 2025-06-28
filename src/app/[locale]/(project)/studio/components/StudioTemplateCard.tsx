"use client"

import React, { useEffect, useState } from "react"

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

import useChatStore from "@/stores/fileStore"

const StudioTemplateCard = () => {
	const { messages } = useChatStore()
	const [shouldHide, setShouldHide] = useState(false)
	const hasMessages = messages && messages.length > 0

	useEffect(() => {
		if (hasMessages) {
			const timeout = setTimeout(() => {
				setShouldHide(true)
				clearTimeout(timeout)
			}, 1000)
		}
	}, [hasMessages])

	if (shouldHide) return null

	return (
		<div
			className={cn(
				"flex flex-col pt-10 items-center z-10 transition-all h-full delay-500",
				hasMessages && "animate-height-reduce  !pt-0"
			)}
		>
			<div
				className={cn(
					"transition-all duration-500 flex flex-col items-center",
					hasMessages && "animate-fade-down"
				)}
			>
				<Logo />
				<p className="text-[28px] font-medium leading-8 mt-10">
					Build Something Great Together with Our Agents
				</p>
				<p className="text-sm text-alphii_text_sub_600">
					Pick a template to get started or use it as a base to create your own
					with a simple prompt.
				</p>
			</div>

			<div className="mt-10 flex flex-col gap-5">
				<div
					className={cn(
						"flex gap-5 items-center transition-all duration-500",
						hasMessages && "animate-fade-left"
					)}
				>
					<div className="w-[150px] h-[100px] bg-alphii_bg_weak_40 flex items-center justify-center rounded-[20px] border dark:border-0 border-alphii_border">
						<PersonalPortfolioIcon />
					</div>
					<div>
						<p className="font-semibold">Website for Personal Portfolio</p>
						<p className="text-alphii_text_sub_600 text-sm">
							Pick a template to get started or use it as a base to create your
							own with a simple prompt.
						</p>
					</div>
				</div>
				<div
					className={cn(
						"flex gap-5 items-center transition-all duration-500",
						hasMessages && "animate-fade-right"
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
						<p className="font-semibold">Flashcard App for Language Learning</p>
						<p className="text-alphii_text_sub_600 text-sm">
							Pick a template to get started or use it as a base to create your
							own with a simple prompt.
						</p>
					</div>

					<Button
						variant="ghost"
						className="w-[72px] h-9 bg-foreground text-background hover:bg-foreground/50 hover:text-background rounded-xl"
					>
						Start
					</Button>
				</div>
				<div
					className={cn(
						"flex gap-5 items-center transition-all duration-500",
						hasMessages && "animate-fade-left"
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
						<p className="font-semibold">Sales Dashboard with KPIs</p>
						<p className="text-alphii_text_sub_600 text-sm">
							Pick a template to get started or use it as a base to create your
							own with a simple prompt.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudioTemplateCard
