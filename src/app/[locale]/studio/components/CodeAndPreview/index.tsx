"use client"

import React, { useState } from "react"

import { cn } from "@/lib/utils"

import Code from "./Code"
import Preview from "./Preview"

export enum StudioTabs {
	CODE = "code",
	PREVIEW = "preview"
}

const CodeAndPreview = () => {
	const [currentTab, setCurrentTab] = useState(StudioTabs.CODE)

	return (
		<div className="flex-1 bg-card rounded-xl border border-alphii_border_2 h-full max-h-full max-w-[calc(100%-65px)]">
			<div className="py-2 px-2.5 flex items-center justify-center border-b border-alphii_border_2">
				<div className="w-1/3 relative flex gap-1 p-1.5 text-sm bg-alphii_bg_weak_50 rounded-[10px]">
					<button
						onClick={() => setCurrentTab(StudioTabs.CODE)}
						className={cn(
							"relative z-10 h-7 transition-all text-center text-alphii_text_sub_600",
							currentTab === StudioTabs.CODE
								? "w-2/3 bg-card text-muted-foreground shadow-md rounded-[6px]"
								: "w-1/3"
						)}
					>
						Code
					</button>
					<button
						onClick={() => setCurrentTab(StudioTabs.PREVIEW)}
						className={cn(
							"relative z-10 h-7 transition-all text-center text-alphii_text_sub_600",
							currentTab === StudioTabs.PREVIEW
								? "w-2/3 bg-card text-muted-foreground shadow-md rounded-[6px]"
								: "w-1/3"
						)}
					>
						Preview
					</button>
				</div>
			</div>
			{currentTab === StudioTabs.CODE ? <Code /> : <Preview />}
		</div>
	)
}

export default CodeAndPreview
