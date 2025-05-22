"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui"
import {
	Accordion,
	AccordionContent,
	AccordionItem
} from "@/components/ui/accordion"
import { usePathname, useRouter } from "@/i18n/routing"
import { cn, fileIcon } from "@/lib/utils"
import { ChevronUp } from "lucide-react"

import { TreeNode } from "./FolderTreeNodes"

interface FolderProps {
	data: TreeNode
	level: number
}

const Folder = ({ data, level }: FolderProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const file = searchParams.get("file")

	const [value, setValue] = useState("")

	return (
		<Accordion type="single" collapsible value={value} onValueChange={setValue}>
			<AccordionItem value={data.name} className="border-0">
				<Button
					variant="ghost"
					className="flex items-center border-0 mt-1 text-alphii_text_sub_600 justify-start gap-2 h-6 p-0 w-full px-4 shadow-none truncate"
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
					<p
						className={cn(
							"max-w-[calc(100%-35px)] truncate",
							value && "font-semibold text-card-foreground"
						)}
					>
						{data.name}
					</p>
				</Button>
				<AccordionContent
					className="border-0"
					style={{
						paddingLeft: `${5 + level * 12}px`
					}}
				>
					{data.children && data.children.length > 0 && (
						<div>
							{data.children.map((child, index) => {
								if (child.type === "file") {
									const Icon = fileIcon(child.name)

									return (
										<Button
											key={child.path}
											variant="ghost"
											onClick={() => {
												const search = new URLSearchParams(
													window.location.search
												)
												search.set("file", child.path)

												router.replace(pathname + "?" + search.toString())
											}}
											className={cn(
												"flex items-center border-0 w-full p-0 mt-1 text-alphii_text_sub_600 justify-start hover:bg-alphii_primary_light gap-2 hover:text-primary h-6 px-4 shadow-none truncate",
												file === child.path &&
													"bg-alphii_primary_light text-primary "
											)}
										>
											{<Icon />}
											<span className="truncate max-w-[calc(100%-35px)]">
												{child.name}
											</span>
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
