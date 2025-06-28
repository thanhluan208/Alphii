"use client"

import React, { Fragment, useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { ChatType } from "@/types"

export interface ChatboxProps {
	type: ChatType
	id: string
	content: string
	name: string
	isUser: boolean
	from?: string
	to?: string
}

const Chatbox = ({ content, name, isUser, to }: ChatboxProps) => {
	const [displayedText, setDisplayedText] = useState("")
	const [currentIndex, setCurrentIndex] = useState(0)

	const listTos = to?.split(", ")

	useEffect(() => {
		if (currentIndex < content.length) {
			const timer = setTimeout(() => {
				// Generate random number between 3-5
				const charsToAdd = Math.floor(Math.random() * 3) + 3

				// Calculate how many characters we can actually add
				const remainingChars = content.length - currentIndex
				const actualCharsToAdd = Math.min(charsToAdd, remainingChars)

				// Add the characters
				const newText = content.slice(0, currentIndex + actualCharsToAdd)
				setDisplayedText(newText)
				setCurrentIndex(currentIndex + actualCharsToAdd)
			}, 25)

			return () => clearTimeout(timer)
		}
	}, [currentIndex, content])

	return (
		<div
			className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
		>
			<div className="flex flex-col bg-card dark:bg-alphii_background_2 border rounded-xl w-fit max-w-[70%] rounded-br-md gap-1 p-3 border-alphii_border dark:border-none">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-[url('/images/agents/bob-avatar.png')] bg-cover bg-center" />
					<p className="text-sm font-medium">{name}</p>
				</div>

				<p className="text-wrap">
					{listTos && listTos.length > 0 && (
						<Fragment>
							{listTos.map((to) => (
								<span
									key={to}
									className="text-xs mx-1 w-fit rounded-md border-alphii_border_2 px-2 py-1 bg-orange-400/20 text-alphii_text_sub_600"
								>{`@${to}`}</span>
							))}
						</Fragment>
					)}
					<span
						className="font-medium whitespace-pre-wrap text-wrap text-sm"
						style={{
							wordBreak: "break-word"
						}}
					>
						{displayedText}
					</span>
				</p>
			</div>
		</div>
	)
}

export default Chatbox
