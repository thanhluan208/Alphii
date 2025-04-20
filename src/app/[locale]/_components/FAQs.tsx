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

	return (
		<Accordion type="single" collapsible value={value}>
			{Array.from({ length: 5 }, (_, i) => {
				return (
					<AccordionItem
						value={`${i}`}
						className="shadow-[0px_4px_10px_0px_#00000014] p-6 rounded-[20px] flex flex-col gap-3 mt-3"
					>
						<div
							className="flex items-center justify-between"
							onClick={() => {
								setValue(value === `${i}` ? "" : `${i}`)
							}}
						>
							Can agents talk to each other?
							{value === `${i}` ? <Minus /> : <Plus />}
						</div>
						<AccordionContent className="text-[#62636C]">
							Yes. Agents collaborate, delegate, and share information
							autonomously.
						</AccordionContent>
					</AccordionItem>
				)
			})}
		</Accordion>
	)
}

export default FAQs
