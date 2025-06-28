import { useId } from "react"
import Image from "next/image"

import { SpinIcon } from "@/components/icons"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { ChatType } from "@/types"
import { ChevronDown } from "lucide-react"

export interface Deepthink {
	type: ChatType
	isPending?: boolean
	content: string
	id: string
}

const DeepThinking = ({ content, isPending }: Deepthink) => {
	const id = useId()

	return (
		<div className={cn("flex w-full justify-start")}>
			{isPending ? (
				<div className="flex items-center gap-3 bg-card dark:bg-alphii_background_2 pr-20 w-3/4 relative dark:border-none border rounded-xl max-w-[70%] rounded-br-md p-3 border-alphii_border_2 ">
					<SpinIcon className="w-4 h-4"/>
					<p className="font-medium font-sm whitespace-pre-wrap">
						The team is having a deep thinking session
					</p>
					<Image
						src="/images/project/deepthink-bg.png"
						alt="deepthing"
						className="absolute bottom-0 right-0"
						width={68}
						height={40}
					/>
				</div>
			) : (
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem
						value={id}
						className=" flex flex-col transition-all w-3/4 gap-1 bg-card dark:bg-alphii_background_2 pr-20 relative dark:border-none border rounded-xl  max-w-[70%] rounded-br-md p-3 border-alphii_border_2 "
					>
						<AccordionTrigger className="p-0 flex items-center gap-3">
							The team finished deep thinking
							<ChevronDown className="transition-transform" />
						</AccordionTrigger>
						<AccordionContent className="mt-2">
							<p className="whitespace-pre-line break-words italic text-alphii_text_sub_600 text-xs">
								{content}
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			)}
		</div>
	)
}

export default DeepThinking
