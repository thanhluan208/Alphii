import React, { Fragment, useEffect, useMemo, useRef } from "react"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"

import FolderTreeNodes, {
	TreeNode
} from "@/components/common/FolderTree/FolderTreeNodes"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { ResizablePanel } from "@/components/ui/resizable"
import data from "@/data/FolderData.json"
import { fileIcon } from "@/lib/utils"
import { Editor, OnMount } from "@monaco-editor/react"
import { cloneDeep, isEmpty } from "lodash"
import { ChevronRight } from "lucide-react"
import * as monaco from "monaco-editor"

const CodeEditor = () => {
	const searchParams = useSearchParams()
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
	const theme = useTheme()

	const file = searchParams.get("file") || ""
	const segments = file?.split("/")
	const currentFileName = segments[segments.length - 1]

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

	const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
		// Set the editor reference
		editorRef.current = editor

		editor.updateOptions({
			minimap: {
				enabled: false
			}
		})

		// Configure TypeScript compiler options
		monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
			target: monacoInstance.languages.typescript.ScriptTarget.ESNext,
			allowNonTsExtensions: true,
			moduleResolution:
				monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
			module: monacoInstance.languages.typescript.ModuleKind.ESNext,
			noEmit: true,
			jsx: monacoInstance.languages.typescript.JsxEmit.React,
			reactNamespace: "React",
			allowJs: true
		})

		// Get the current model
		const model = editor.getModel()
		if (model) {
			// Dispose of the current model (optional, ensures a clean slate)
			// model.dispose();

			// Create a new model with a .tsx extension
			const newModel = monacoInstance.editor.createModel(
				model.getValue(), // Keep the current content
				"typescript", // Language
				monacoInstance.Uri.file("inmemory://model.tsx") // Explicit .tsx extension
			)

			// Attach the new model to the editor
			editor.setModel(newModel)

			// Clean up the old model if needed
			model.dispose()
		}
	}

	const renderBreadcrumbs = () => {
		const segments = file.split("/")

		const listBreadCrumbs: React.ReactNode[] = []

		let lastTree: TreeNode[] = []

		for (let i = 0; i < segments.length; i++) {
			const Icon = fileIcon(segments[i])

			const currentLevel = isEmpty(lastTree) ? tree : lastTree

			listBreadCrumbs.push(
				<Fragment>
					<BreadcrumbItem>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center text-alphii_text_sub_600 hover:text-muted-foreground hover:font-semibold gap-1 focus-visible:outline-0">
								{i === segments.length - 1 && <Icon className="w-4 h-4" />}
								{segments[i]}
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="start"
								className="bg-card border-alphii_border_2 max-h-[400px] overflow-y-auto no-scrollbar"
							>
								<FolderTreeNodes data={currentLevel} />
							</DropdownMenuContent>
						</DropdownMenu>
					</BreadcrumbItem>
					{i < segments.length - 1 && (
						<BreadcrumbSeparator>
							<ChevronRight />
						</BreadcrumbSeparator>
					)}
				</Fragment>
			)

			lastTree =
				cloneDeep(currentLevel).find((elm) => {
					return elm.name === segments[i]
				})?.children || []
		}

		return <Fragment>{listBreadCrumbs.map((node) => node)}</Fragment>
	}

	const currentFileContent = useMemo(() => {
		if (!file || !data) return null

		return (
			(data[file as keyof typeof data] as unknown as TreeNode)?.contents || null
		)
	}, [file, data])

	useEffect(() => {
		if (currentFileContent && editorRef.current) {
			editorRef.current.setValue(currentFileContent)
		}
	}, [currentFileContent])

	return (
		<ResizablePanel defaultSize={80}>
			<div className="h-full">
				<div className="px-2.5 py-2 border-b border-alphii_border_2 min-h-[57px] flex items-center">
					{file && (
						<Breadcrumb>
							<BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
						</Breadcrumb>
					)}
				</div>
				{currentFileContent && (
					<Editor
						height="calc(100% - 57px)"
						defaultLanguage="typescript"
						defaultValue={currentFileContent}
						onMount={handleEditorDidMount}
						theme={theme.theme === 'dark' ? "vs-dark" : "vs"}
					/>
				)}
			</div>
		</ResizablePanel>
	)
}

export default CodeEditor
