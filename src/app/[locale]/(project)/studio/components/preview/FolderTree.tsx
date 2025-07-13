"use client"

import { Fragment, useState } from "react"

import FolderTreeNodes, {
	TreeNode
} from "@/components/common/FolderTree/FolderTreeNodes"
import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react"

import useChatStore from "@/stores/chat.store"
import useCodeEditorStore from "@/stores/code-editor.store"

const FolderTree = () => {
	const { listFiles } = useChatStore()
	const { openFolderTree, setOpenFolderTree } = useCodeEditorStore()

	function parseFolderDataToTree(data: Record<string, any>): TreeNode[] {
		// Step 1: Collect all entries and group by path segments
		const nodesMap = new Map<string, TreeNode>()
		const rootNodes: TreeNode[] = []

		// Step 2: Process each entry in the JSON
		Object.entries(data).forEach(([key, value]) => {
			const { name, type, fullPath, contents, isBinary, lastModified, status } =
				value

			// Create a node for the current entry
			const node: TreeNode = {
				name,
				type,
				fullPath,
				...(type === "file" && { contents, isBinary, lastModified }),
				status
			}

			// Split the fullPath into segments
			const pathSegments = fullPath
				.split("/")
				.filter((segment: string) => segment !== "")
			const parentPath = pathSegments.slice(0, -1).join("/")

			// Store the node in the map
			nodesMap.set(fullPath, node)

			// If it's a root-level item (no parent path), add to rootNodes
			if (!parentPath) {
				rootNodes.push(node)
			} else {
				// Find or create the parent node
				let parentNode = nodesMap.get(parentPath)
				if (!parentNode) {
					// Create a placeholder parent folder if it doesn't exist
					parentNode = {
						name: pathSegments[pathSegments.length - 2],
						type: "folder",
						fullPath: parentPath,
						children: [],
						status: "new"
					}
					nodesMap.set(parentPath, parentNode)

					// If the parent is also not at root, ensure it's added to its own parent
					const grandParentPath = pathSegments.slice(0, -2).join("/")
					if (grandParentPath && !nodesMap.has(grandParentPath)) {
						const grandParentNode: TreeNode = {
							name: pathSegments[pathSegments.length - 3] || grandParentPath,
							type: "folder",
							fullPath: grandParentPath,
							children: [],
							status: "new"
						}
						nodesMap.set(grandParentPath, grandParentNode)
						if (!grandParentPath.includes("/")) {
							rootNodes.push(grandParentNode)
						}
					}
				}

				// Initialize children array if it doesn't exist
				if (!parentNode?.children) {
					parentNode!.children = []
				}

				// Add the current node to its parent's children
				parentNode.children.push(node)
			}
		})

		// Step 3: Sort nodes to mimic VS Code (folders first, then files, alphabetically)
		const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
			return nodes.sort((a, b) => {
				if (a.type === "folder" && b.type === "file") return -1
				if (a.type === "file" && b.type === "folder") return 1
				return a.name.localeCompare(b.name)
			})
		}

		// Sort children of each folder
		nodesMap.forEach((node) => {
			if (node.children) {
				node.children = sortNodes(node.children)
			}
		})

		// Sort root nodes
		return sortNodes(rootNodes)
	}

	const tree = parseFolderDataToTree(listFiles)

	return (
		<Fragment>
			<Button
				variant="ghost"
				className="top-1 z-10 h-fit w-fit p-0 opacity-50 hover:opacity-100 left-1 absolute"
				onClick={(e) => {
					e.preventDefault()
					e.stopPropagation()
					setOpenFolderTree(true)
				}}
			>
				<PanelLeftOpen size={14} />
			</Button>
			<div
				className={cn(
					"pb-2 max-h-full h-full absolute shadow-sm top-0 bg-alphii_background_2 left-0 z-20 w-0 max-w-44 overflow-auto transition-all no-scrollbar",
					openFolderTree && "w-44"
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<Button
					variant="ghost"
					className="absolute top-0 right-0 h-full p-0 opacity-50 hover:opacity-100 w-[1px] bg-[linear-gradient(90deg,#9280FF_0%,#FFFFFF_50%,#9280FF_100%)]"
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						setOpenFolderTree(false)
					}}
				/>
				{openFolderTree && <FolderTreeNodes data={tree} />}
			</div>
		</Fragment>
	)
}

export default FolderTree
