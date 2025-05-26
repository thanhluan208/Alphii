"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export interface ChatboxProps {
	id: string
	content: string
	name: string
	isUser: boolean
}

const Chatbox = ({ content, name, isUser }: ChatboxProps) => {
	const [displayedText, setDisplayedText] = useState("")
	const [currentIndex, setCurrentIndex] = useState(0)

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
			<div className="flex flex-col bg-card border rounded-xl w-fit max-w-[70%] rounded-br-md gap-1 p-3 border-alphii_border_2 ">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-[url('/images/agents/bob-avatar.png')] bg-cover bg-center" />
					<p className="text-sm font-medium">{name}</p>
				</div>

				<div className="flex flex-col gap-1">
					<p className="font-medium whitespace-pre-wrap">{displayedText}</p>
				</div>
			</div>
		</div>
	)
}

export default Chatbox
