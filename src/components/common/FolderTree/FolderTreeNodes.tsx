"use client"

import React, { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui"
import { usePathname, useRouter } from "@/i18n/routing"
import { cn, fileIcon } from "@/lib/utils"

import useFileStore from "@/stores/fileStore"

import Folder from "./Folder"

export interface TreeNode {
	name: string
	type: "folder" | "file"
	path: string
	children?: TreeNode[]
	contents?: string
	isBinary?: boolean
	lastModified?: number
}

interface FolderTreeNodesProps {
	data: TreeNode[]
}

const FolderTreeNodes = ({ data }: FolderTreeNodesProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const seachParams = useSearchParams()

	const file = seachParams.get("file")

	return (
		<div className="flex flex-col">
			{data &&
				data.map((node) => {
					if (node.type === "folder")
						return <Folder key={node.path} data={node} level={0} />

					const Icon = fileIcon(node.name)

					return (
						<Button
							key={node.path}
							// onClick={() => setCurrentFile(node)}
							variant="ghost"
							onClick={() => {
								const search = new URLSearchParams(window.location.search)
								search.set("file", node.path)

								router.replace(pathname + "?" + search.toString())
							}}
							className={cn(
								"flex w-full items-center border-0 justify-start hover:bg-alphii_primary_light gap-2 hover:text-primary text-alphii_text_sub_600 mt-1 h-6 px-4 shadow-none",
								file === node.path &&
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
