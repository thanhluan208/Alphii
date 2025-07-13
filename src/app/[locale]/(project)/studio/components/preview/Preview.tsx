"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"

import { ExitExpandIcon, SpinIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

import useChatStore from "@/stores/chat.store"

import CodeEditor from "./CodeEditor"
import Thinking from "./Thinking"

enum PreviewTab {
	THINKING = "thinking",
	CODE = "code",
	PREVIEW = "preview"
}

const Preview = () => {
	const [tab, setTab] = useState(PreviewTab.CODE)
	const { viewDetail, setViewDetail } = useChatStore()

	const renderContent = () => {
		switch (tab) {
			case PreviewTab.THINKING:
				return <Thinking />
			case PreviewTab.CODE:
				return <CodeEditor />
			default:
				return <Thinking />
		}
	}

	return (
		<div
			className={cn(
				"h-full transition-all flex flex-col overflow-hidden w-0 opacity-0 rounded-lg duration-300",
				viewDetail &&
					"w-[calc(55%)] ml-5 border border-alphii_skeleton_sub opacity-100"
			)}
		>
			<div className="w-full justify-between flex items-center px-2.5 py-2">
				<div className="bg-alphii_background_2 flex gap-1 p-1 w-fit rounded-lg relative">
					{Object.values(PreviewTab).map((elm) => {
						return (
							<button
								key={elm}
								onClick={() => setTab(elm)}
								className={cn(
									"w-[90px] h-7 capitalize transition-colors text-sm text-foreground z-10 font-medium flex items-center justify-center",
									elm !== tab && "text-alphii_text_sub_600"
								)}
							>
								{elm}
							</button>
						)
					})}

					<div
						className={cn(
							"absolute w-[90px] h-7 bg-background transition-all rounded-[6px] top-1 left-1",
							tab === PreviewTab.CODE && "left-[98px]",
							tab === PreviewTab.PREVIEW && "left-[192px]"
						)}
					/>
				</div>
				<button
					onClick={() => setViewDetail(false)}
					className="w-6 h-6 flex items-center justify-center"
				>
					<ExitExpandIcon />
				</button>
			</div>
			{renderContent()}
			<div className="bg-background h-12 w-full px-3 flex items-center gap-2">
				<SpinIcon className="w-4 h-4" />
				<p className="text-xs">
					<span className="text-alphii_text_sub_600">Currently </span>
					Exploring Korean Flash Card App
				</p>
			</div>
		</div>
	)
}

export default Preview
