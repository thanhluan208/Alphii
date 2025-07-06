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
			question: "Can agents talk to each other??",
			answer:
				"Yes. Agents collaborate, delegate, and share information autonomously."
		},
		{
			question: "How does it work?",
			answer:
				"Agents coordinate through Agent-to-Agent (A2A) protocols to make smart decisions and build your product step by step."
		},
		{
			question: "What are the benefits?",
			answer:
				"Every agent has a role—PM, dev, QA, etc.—and they work together like a synced-up team."
		},
		{
			question: "What are the common applications?",
			answer:
				"100%. Just tell Alphii what you want. Agents handle the rest—planning, coding, testing, and launching."
		},
		{
			question: "How can I get started?",
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
						className="border-b-[1.5px] border-[#E7E8EC] pb-4 border-dashed flex flex-col gap-3 mt-3 "
					>
						<div
							className="flex items-center gap-4"
							onClick={() => {
								setValue(value === `${i}` ? "" : `${i}`)
							}}
						>
							{value === `${i}` ? <Minus /> : <Plus className="text-primary" />}
							{item.question}
						</div>
						<AccordionContent className="text-alphii_text_sub_600">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}

export default FAQs
