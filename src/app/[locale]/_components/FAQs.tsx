"use client"

import React from "react"

import {
	Accordion,
	AccordionContent,
	AccordionItem
} from "@/components/ui/accordion"
import { Minus, Plus } from "lucide-react"

const FAQs = () => {
	const [value, setValue] = React.useState("0")

	const faqItems = [
		{
			question: "What is Alphii AI?",
			answer:
				"Alphii AI is your plug-and-play AI team—agents that build your product like a real dev squad."
		},
		{
			question: "How does it work?",
			answer:
				"Agents coordinate through Agent-to-Agent (A2A) protocols to make smart decisions and build your product step by step."
		},
		{
			question: "What makes Alphii AI different?",
			answer:
				"Every agent has a role—PM, dev, QA, etc.—and they work together like a synced-up team."
		},
		{
			question: "Can I build something without knowing how to code?",
			answer:
				"100%. Just tell Alphii what you want. Agents handle the rest—planning, coding, testing, and launching."
		},
		{
			question: "Can I customize how my product is built?",
			answer:
				"Yes! You can tweak how agents work, guide the process, or let them do their thing. Your product, your way."
		}
	]

	return (
		<Accordion type="single" collapsible value={value}>
			{faqItems.map((item, i) => {
				return (
					<AccordionItem
						key={i}
						value={`${i}`}
						className="shadow-[0px_4px_10px_0px_#00000014] p-6 rounded-[20px] flex flex-col gap-3 mt-3"
					>
						<div
							className="flex items-center justify-between"
							onClick={() => {
								setValue(value === `${i}` ? "" : `${i}`)
							}}
						>
							{item.question}
							{value === `${i}` ? <Minus /> : <Plus />}
						</div>
						<AccordionContent className="text-[#62636C]">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}

export default FAQs
