"use client"

import React from "react"
import { useTranslations } from "next-intl"

import {
	Accordion,
	AccordionContent,
	AccordionItem
} from "@/components/ui/accordion"
import { Minus, Plus } from "lucide-react"

const FAQs = () => {
	const translation = useTranslations("home")
	const [value, setValue] = React.useState("0")

	const faqItems = [
		{
			question: translation("faq1Question"),
			answer: translation("faq1Answer")
		},
		{
			question: translation("faq2Question"),
			answer: translation("faq2Answer")
		},
		{
			question: translation("faq3Question"),
			answer: translation("faq3Answer")
		},
		{
			question: translation("faq4Question"),
			answer: translation("faq4Answer")
		},
		{
			question: translation("faq5Question"),
			answer: translation("faq5Answer")
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
