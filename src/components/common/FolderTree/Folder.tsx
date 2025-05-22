"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/components/ui/accordion"
import { cn, fileIcon } from "@/lib/utils"
import { ChevronUp, File } from "lucide-react"

import useFileStore from "@/stores/fileStore"

import { TreeNode } from "./FolderTree"

interface FolderProps {
	data: TreeNode
	level: number
}

const Folder = ({ data, level }: FolderProps) => {
	const [value, setValue] = useState("")

	const { setCurrentFile } = useFileStore()

	return (
		<Accordion type="single" collapsible value={value} onValueChange={setValue}>
			<AccordionItem value={data.name} className="border-0">
				<Button
					variant="ghost"
					className="flex items-center mt-1 justify-start gap-2 h-6 p-0 px-4 shadow-none w-[230px]"
					onClick={() =>
						setValue((prev) => (prev === data.name ? "" : data.name))
					}
				>
					<ChevronUp
						className={cn(
							!value ? "rotate-90" : "rotate-180",
							"transition-transform"
						)}
					/>
					<p className={cn(value && "font-semibold")}>{data.name}</p>
				</Button>
				<AccordionContent
					className="border-0"
					style={{
						paddingLeft: `${10 + level * 12}px`
					}}
				>
					{data.children && data.children.length > 0 && (
						<div>
							{data.children.map((child, index) => {
								if (child.type === "file") {
									const Icon = fileIcon(child.name)

									return (
										<Button
											key={child.name}
											onClick={() => setCurrentFile(child)}
											variant="ghost"
											className="flex items-center mt-1 justify-start gap-2 h-6 p-0 px-4 shadow-none w-[230px]"
										>
											{<Icon />}
											<span>{child.name}</span>
										</Button>
									)
								}

								return <Folder key={index} data={child} level={level + 1} />
							})}
						</div>
					)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default Folder
