"use client"

import React, { useState } from "react"

import { cn } from "@/lib/utils"

export enum StudioTabs {
	CODE = "code",
	PREVIEW = "preview"
}

const CodeAndPreview = () => {
	const [currentTab, setCurrentTab] = useState(StudioTabs.CODE)

	return (
		<div className="flex-1 bg-card rounded-xl border border-alphii_border_2 h-full">
			<div className="py-2 px-2.5 flex items-center justify-center">
				<div className="w-1/3 relative flex gap-1 p-1 bg-alphii_bg_weak_50 rounded-[10px]">
					<button
						className={cn(
							"relative z-10 h-7 transition-all",
							currentTab === StudioTabs.CODE ? "w-2/3" : "w-1/3"
						)}
					>
						Code
					</button>
					<button
						className={cn(
							"relative z-10 h-7 transition-all",
							currentTab === StudioTabs.PREVIEW ? "w-2/3" : "w-1/3"
						)}
					>
						Preview
					</button>
					<div
						className={cn(
							"shadow-lg absolute w-[calc(66%-8px-4px)] rounded-[10px] bg-muted-foreground h-7 top-1",
							currentTab === StudioTabs.CODE
								? "left-[4px]"
								: "left-[calc(33.33333%+8px)]"
						)}
					/>
				</div>
			</div>
		</div>
	)
}

export default CodeAndPreview
