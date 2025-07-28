"use client"

import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui"
import { cn, fileIcon } from "@/lib/utils"

import useChatStore from "@/stores/chat.store"

import Folder from "./Folder"

export interface TreeNode {
	name: string
	type: "folder" | "file"
	fullPath: string
	children?: TreeNode[]
	content?: string
	isBinary?: boolean
	lastModified?: number
	status: "new" | "modified" | "deleted"
	disabledAnimation?: boolean
	typedContent: string
}

interface FolderTreeNodesProps {
	data: TreeNode[]
}

const FolderTreeNodes = ({ data }: FolderTreeNodesProps) => {
	const seachParams = useSearchParams()
	const { setCurrentFile } = useChatStore()

	const file = seachParams.get("file")

	return (
		<div className="flex flex-col">
			{data &&
				data.map((node) => {
					if (node.type === "folder")
						return <Folder key={node.fullPath} data={node} level={0} />

					const Icon = fileIcon(node.name)

					return (
						<Button
							key={node.fullPath}
							variant="ghost"
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								setCurrentFile({
									...node,
									typedContent: node.content || ""
								})
							}}
							className={cn(
								"flex w-full items-center border-0 justify-start truncate hover:bg-alphii_primary_light gap-2 hover:text-primary text-alphii_text_sub_600 mt-1 h-6 px-4 shadow-none",
								file === node.fullPath &&
									"bg-alphii_primary_light  hover:bg-alphii_primary_light text-primary hover:text-primary"
							)}
						>
							<Icon />
							<span>{node.name}</span>
						</Button>
					)
				})}
		</div>
	)
}

export default FolderTreeNodes
