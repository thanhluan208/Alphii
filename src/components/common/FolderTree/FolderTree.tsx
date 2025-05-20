"use client"

import React, { useMemo } from "react"

import { Button } from "@/components/ui"
import data from "@/data/FolderData.json"
import { fileIcon } from "@/lib/utils"

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

const FolderTree = () => {
	const { setCurrentFile } = useFileStore()

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

	// Optional: Function to print the tree for debugging
	function printTree(nodes: TreeNode[], indent: string = "") {
		nodes.forEach((node) => {
			console.log(
				`${indent}${node.type === "folder" ? "📁" : "📄"} ${node.name}`
			)
			if (node.children) {
				printTree(node.children, indent + "  ")
			}
		})
	}

	printTree(tree)

	return (
		<div className="flex flex-col">
			{tree.map((node) => {
				if (node.type === "folder")
					return <Folder key={node.path} data={node} level={0} />

				const Icon = fileIcon(node.name)
				return (
					<Button
						key={node.name}
						onClick={() => setCurrentFile(node)}
						variant="ghost"
						className="flex items-center justify-start gap-2 mt-1 h-6 p-0 px-4 shadow-none w-[230px]"
					>
						<Icon />
						<span className="text-sm text-gray-500">{node.name}</span>
					</Button>
				)
			})}
		</div>
	)
}

export default FolderTree
