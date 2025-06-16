"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

import { PromptIcon, SpinIcon, TokenIcon } from "@/components/icons"
import { Button } from "@/components/ui"
import GradientBorderCard from "@/components/ui/gradient-border-card"
import { usePathname, useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { MATMessageType } from "@/types/mat.type"
import { ArrowUp, AtSign, ChevronRight } from "lucide-react"

import useSocketStore from "@/stores/socket.store"
import useMATMutation from "@/hooks/MultiAgentTeam/useMATMutation"

import Case from "./components/Case"
import ChatContent from "./components/ChatContent"
import ChatInput from "./components/ChatInput"

const Showcases = () => {
	const searchParams = useSearchParams()
	const prompt = searchParams.get("prompt")

	useEffect(() => {
		if (prompt) {
			const timeout = setTimeout(() => {
				const removed = document.querySelector(".removed")
				if (removed) {
					removed.remove()
				}
			}, 1000)

			return () => clearTimeout(timeout)
		}
	}, [prompt])

	return (
		<div>
			<div className="sticky top-0 left-0 w-full h-14 bg-background z-50 flex items-center justify-between px-10">
				<Image src={"/images/logo.png"} alt="logo" width={86} height={23.71} />
			</div>
			<div className={cn("px-[60px] lg:px-[200px] flex flex-col")}>
				<div
					className={cn(
						"max-w-[1400px] mx-auto py-[60px] h-fit",
						prompt && "py-10 h-[calc(100vh-56px)] overflow-hidden"
					)}
				>
					<ChatContent />

					<p
						className={cn(
							"text-3xl  leading-9 h-[72px] font-semibold text-center transition-all opacity-100 duration-500",
							prompt && "opacity-0 h-0 w-0 overflow-hidden removed"
						)}
					>
						See how others like you are building{" "}
						<span className="text-alphii_primary">web projects</span>,<br />
						<span className="text-alphii_primary_50">
							data processing, presentations,
						</span>{" "}
						and more
					</p>

					<ChatInput />

					<div
						className={cn(
							"h-[1px] w-full bg-alphii_border my-10 transition-all duration-300",
							prompt && "opacity-0 h-0 w-0 overflow-hidden removed"
						)}
					/>

					<div
						className={cn(
							"py-3 flex justify-between ",
							prompt && "hidden removed"
						)}
					>
						<div>
							<p className="text-xl font-[500]">Community Showcases</p>
							<p className="text-sm text-alphii_text_sub_600">
								Please ensure the following items are completed so that you can
								start using Alphii AI
							</p>
						</div>

						<Button
							variant="ghost"
							className="h-10 shadow-none border-alphii_border rounded-lg p-0 px-3 py-2.5 w-fit"
						>
							View all <ChevronRight className="ml-2" />
						</Button>
					</div>

					<div
						className={cn(
							"mt-5 grid lg:grid-cols-4 lg:gap-5 transition-all duration-300",
							prompt && "opacity-0 h-0 w-0 overflow-hidden removed"
						)}
					>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((elm) => (
							<Case key={elm} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Showcases
