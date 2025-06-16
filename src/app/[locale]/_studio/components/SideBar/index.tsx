"use client"

import React, { Fragment } from "react"
import { useSearchParams } from "next/navigation"

import SheetSidebar from "@/components/common/SheetSidebar/SheetSidebar"
import UserSetting from "@/components/common/UserSetting/UserSetting"
import { AddIcon, CollapseIcon } from "@/components/icons"
import { Button } from "@/components/ui"
import { usePathname, useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const Sidebar = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const currentAgent = searchParams.get("agent") || "bob"

	const listAgent = ["bob", "bob 1", "bob 2", "bob 3"]

	const currentAgentIndex = listAgent.findIndex((elm) => elm === currentAgent)

	return (
		<div className="h-full flex flex-col justify-between">
			<div className="flex relative flex-col gap-1.5 border border-alphii_border_2 rounded-[14px] p-1.5 bg-card">
				{listAgent.map((elm, index) => {
					const isSelected = currentAgent === elm
					return (
						<button
							key={elm}
							onClick={() => {
								if (isSelected) return
								const params = new URLSearchParams(window.location.search)
								params.set("agent", elm)

								router.replace(pathname + "?" + params.toString(), {
									scroll: false
								})
							}}
							className={cn(
								" w-11 rounded-xl bg-[url('/images/agents/bob-avatar.png')] h-11 bg-center bg-cover",
								isSelected && "border border-alphii_border "
							)}
						></button>
					)
				})}

				<Button
					variant="ghost"
					className="bg-background text-card-foreground rounded-xl h-11 w-11 p-0 flex items-center justify-center"
				>
					<AddIcon />
				</Button>
				{currentAgentIndex !== -1 && (
					<div
						className="absolute w-1 h-6 rounded-r-[10px] transition-all dark:bg-white bg-black left-0"
						style={{
							top: `calc(6px + ${currentAgentIndex * 6}px + ${(currentAgentIndex + 1) * 22}px + ${currentAgentIndex * 22}px - 12px)`
						}}
					/>
				)}
			</div>

			<div className="flex flex-col gap-2 p-1.5">
				<UserSetting />
				<SheetSidebar />
			</div>
		</div>
	)
}

export default Sidebar
