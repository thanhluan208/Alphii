"use client"

import React, { Fragment } from "react"

import FolderTreeNodes, { TreeNode } from "@/components/common/FolderTree/FolderTreeNodes"
import { FilesIcon, SearchIcon } from "@/components/icons"
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"
import data from "@/data/FolderData.json"
import { cn } from "@/lib/utils"

export enum TreeTabs {
	FILES = "files",
	SEARCH = "search"
}

const FolderTree = () => {
	const [treeTab, setTreeTab] = React.useState(TreeTabs.FILES)

	function parseFolderDataToTree(data: Record<string, any>): TreeNode[] {
		// Step 1: Collect all entries and group by path segments
		const nodesMap = new Map<string, TreeNode>()
		const rootNodes: TreeNode[] = []

		// Step 2: Process each entry in the JSON
		Object.entries(data).forEach(([key, value]) => {
			const { name, type, fullPath, contents, isBinary, lastModified } = value

			// Create a node for the current entry
			const node: TreeNode = {
				name,
				type,
				path: fullPath,
				...(type === "file" && { contents, isBinary, lastModified })
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
						path: parentPath,
						children: []
					}
					nodesMap.set(parentPath, parentNode)

					// If the parent is also not at root, ensure it's added to its own parent
					const grandParentPath = pathSegments.slice(0, -2).join("/")
					if (grandParentPath && !nodesMap.has(grandParentPath)) {
						const grandParentNode: TreeNode = {
							name: pathSegments[pathSegments.length - 3] || grandParentPath,
							type: "folder",
							path: grandParentPath,
							children: []
						}
						nodesMap.set(grandParentPath, grandParentNode)
						if (!grandParentPath.includes("/")) {
							rootNodes.push(grandParentNode)
						}
					}
				}

				// Initialize children array if it doesn't exist
				if (!parentNode.children) {
					parentNode.children = []
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

	const tree = parseFolderDataToTree(data)

	return (
		<Fragment>
			<ResizablePanel defaultSize={20} className="min-w-[204px]">
				<div className="border-r h-full border-alphii_border_2 ">
					<div className="px-2.5 py-2 border-b border-alphii_border_2">
						<div className="w-full grid grid-cols-2 bg-alphii_bg_weak_50 gap-1 text-sm rounded-[10px] p-1.5">
							<button
								onClick={() => setTreeTab(TreeTabs.FILES)}
								className={cn(
									"relative h-7 transition-all text-alphii_text_sub_600 flex items-center justify-center gap-2",
									treeTab === TreeTabs.FILES &&
										" bg-card text-muted-foreground shadow-md rounded-[6px]"
								)}
							>
								<FilesIcon />
								Files
							</button>
							<button
								onClick={() => setTreeTab(TreeTabs.SEARCH)}
								className={cn(
									"relative h-7 transition-all text-alphii_text_sub_600 flex items-center justify-center gap-2",
									treeTab === TreeTabs.SEARCH &&
										" bg-card text-muted-foreground shadow-md rounded-[6px]"
								)}
							>
								<SearchIcon />
								Search
							</button>
						</div>
					</div>

					<div className="pb-2 max-h-[calc(100%-65px)] max-w-full overflow-auto no-scrollbar">
						{treeTab === TreeTabs.FILES && <FolderTreeNodes data={tree}/>}
					</div>
				</div>
			</ResizablePanel>
			<ResizableHandle />
		</Fragment>
	)
}

export default FolderTree
