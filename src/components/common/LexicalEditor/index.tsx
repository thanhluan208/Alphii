"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import {
	$createTextNode,
	$getNodeByKey,
	$getRoot,
	$getSelection,
	$isRangeSelection,
	$isTextNode,
	FORMAT_TEXT_COMMAND,
	TextFormatType
} from "lexical"
import {
	AtSign,
	Bold,
	Hash,
	ImageIcon,
	Italic,
	Link,
	List,
	Settings,
	Trash2,
	Underline,
	User
} from "lucide-react"

import {
	$createMentionNode,
	$isMentionNode,
	getDropTargetMention,
	MentionNode,
	setDraggedMention,
	setDropTargetMention,
	setHoveredMention
} from "./MentionNode"

// Types
interface Mention {
	id: string
	name: string
	avatar?: string
	type: "user" | "channel"
}

interface Command {
	id: string
	name: string
	description: string
	icon: React.ReactNode
	action: () => void
}

interface DraggedMention {
	mentionId: string
	mentionName: string
	mentionType: "user" | "channel"
	sourceNodeKey: string
}

// Sample data
const SAMPLE_MENTIONS: Mention[] = [
	{ id: "1", name: "John Doe", type: "user" },
	{ id: "2", name: "Jane Smith", type: "user" },
	{ id: "3", name: "general", type: "channel" },
	{ id: "4", name: "development", type: "channel" },
	{ id: "5", name: "design", type: "channel" }
]

// Custom Error Boundary Component
function CustomErrorBoundary({ children }: { children: React.ReactNode }) {
	return <div className="lexical-error-boundary">{children}</div>
}

// Add Mention Button Component
function AddMentionButton() {
	const [editor] = useLexicalComposerContext()
	const [isOpen, setIsOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const [filteredMentions, setFilteredMentions] =
		useState<Mention[]>(SAMPLE_MENTIONS)

	useEffect(() => {
		const filtered = SAMPLE_MENTIONS.filter((mention) =>
			mention.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
		setFilteredMentions(filtered)
	}, [searchQuery])

	const insertMentionAtCursor = useCallback(
		(mention: Mention) => {
			editor.update(() => {
				try {
					const selection = $getSelection()

					// Create the mention node first
					const mentionNode = $createMentionNode(
						mention.id,
						mention.name,
						mention.type
					)

					if ($isRangeSelection(selection)) {
						const anchor = selection.anchor
						const anchorNode = anchor.getNode()

						if ($isTextNode(anchorNode)) {
							const textContent = anchorNode.getTextContent()
							const anchorOffset = anchor.offset

							// Split the text content at cursor position
							const beforeText = textContent.slice(0, anchorOffset)
							const afterText = textContent.slice(anchorOffset)

							// Update the current text node with before text
							anchorNode.setTextContent(beforeText)

							// Insert the mention node
							anchorNode.insertAfter(mentionNode)

							// Add after text if it exists
							if (afterText) {
								const afterTextNode = $createTextNode(afterText)
								mentionNode.insertAfter(afterTextNode)
							}

							// Add space after mention and set cursor there
							const spaceNode = $createTextNode(" ")
							if (afterText) {
								const afterTextNode = mentionNode.getNextSibling()
								if (afterTextNode && $isTextNode(afterTextNode)) {
									afterTextNode.insertBefore(spaceNode)
								}
							} else {
								mentionNode.insertAfter(spaceNode)
							}

							// Set cursor after the space
							spaceNode.select(1, 1)
						} else if ($isMentionNode(anchorNode)) {
							// If cursor is on a mention, insert after it
							const spaceNode = $createTextNode(" ")
							anchorNode.insertAfter(spaceNode)
							spaceNode.insertAfter(mentionNode)

							const finalSpaceNode = $createTextNode(" ")
							mentionNode.insertAfter(finalSpaceNode)
							finalSpaceNode.select(1, 1)
						} else {
							// For other node types, try to insert at the end
							const parent = anchorNode.getParent()
							if (parent) {
								parent.append(mentionNode)
								const spaceNode = $createTextNode(" ")
								mentionNode.insertAfter(spaceNode)
								spaceNode.select(1, 1)
							}
						}
					} else {
						// No selection, insert at the end of the editor
						const root = $getRoot()
						const lastChild = root.getLastChild()

						if (lastChild && $isTextNode(lastChild)) {
							lastChild.insertAfter(mentionNode)
						} else {
							root.append(mentionNode)
						}

						const spaceNode = $createTextNode(" ")
						mentionNode.insertAfter(spaceNode)
						spaceNode.select(1, 1)
					}
				} catch (error) {
					console.error("Error inserting mention:", error)
				}
			})

			setIsOpen(false)
			setSearchQuery("")

			// Focus back to the editor
			setTimeout(() => {
				editor.focus()
			}, 0)
		},
		[editor]
	)

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="flex items-center gap-2">
					<AtSign className="w-4 h-4" />
					Add Mention
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-0" align="start">
				<div className="p-3 border-b">
					<div className="flex items-center gap-2 mb-2">
						<AtSign className="w-4 h-4" />
						<span className="font-medium">Add Mention</span>
					</div>
					<input
						type="text"
						placeholder="Search mentions..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						autoFocus
					/>
				</div>
				<div className="max-h-64 overflow-y-auto">
					{filteredMentions.length > 0 ? (
						<div className="p-2">
							{filteredMentions.map((mention) => (
								<Button
									key={mention.id}
									variant="ghost"
									className="w-full justify-start h-auto p-3 mb-1"
									onClick={() => insertMentionAtCursor(mention)}
								>
									<div className="flex items-center gap-3">
										{mention.type === "user" ? (
											<User className="w-4 h-4 text-blue-600" />
										) : (
											<Hash className="w-4 h-4 text-green-600" />
										)}
										<div className="text-left">
											<div className="font-medium">{mention.name}</div>
											<div className="text-xs text-muted-foreground capitalize">
												{mention.type}
											</div>
										</div>
									</div>
								</Button>
							))}
						</div>
					) : (
						<div className="p-4 text-center text-sm text-muted-foreground">
							No mentions found
						</div>
					)}
				</div>
				<div className="p-2 border-t bg-muted/50">
					<p className="text-xs text-muted-foreground">
						Select a mention to insert at cursor position
					</p>
				</div>
			</PopoverContent>
		</Popover>
	)
}

// Mention Position Swapper Component
function MentionPositionSwapper() {
	const [editor] = useLexicalComposerContext()
	const [position1, setPosition1] = useState("")
	const [position2, setPosition2] = useState("")
	const [mentionCount, setMentionCount] = useState(0)
	const [isOpen, setIsOpen] = useState(false)

	// Update mention count when editor changes
	useEffect(() => {
		const unregister = editor.registerUpdateListener(() => {
			editor.getEditorState().read(() => {
				const root = $getRoot()
				let count = 0

				const countMentions = (node: any) => {
					if ($isMentionNode(node)) {
						count++
					}
					// Check if node has children before trying to get them
					if (node.getChildrenSize && node.getChildrenSize() > 0) {
						const children = node.getChildren()
						children.forEach(countMentions)
					}
				}

				countMentions(root)
				setMentionCount(count)
			})
		})
		return unregister
	}, [editor])

	const getAllMentionNodes = useCallback(() => {
		const mentions: { node: any; position: number }[] = []
		let position = 0

		const collectMentions = (node: any) => {
			if ($isMentionNode(node)) {
				mentions.push({ node, position })
				position++
			} else {
				// Check if node has children before trying to get them
				if (node.getChildrenSize && node.getChildrenSize() > 0) {
					const children = node.getChildren()
					children.forEach(collectMentions)
				}
			}
		}

		const root = $getRoot()
		collectMentions(root)
		return mentions
	}, [])

	const swapMentionPositions = useCallback(() => {
		const pos1 = Number.parseInt(position1) - 1 // Convert to 0-based index
		const pos2 = Number.parseInt(position2) - 1 // Convert to 0-based index

		if (isNaN(pos1) || isNaN(pos2)) {
			alert("Please enter valid position numbers")
			return
		}

		if (pos1 < 0 || pos2 < 0) {
			alert("Position numbers must be greater than 0")
			return
		}

		if (pos1 === pos2) {
			alert("Please enter different positions")
			return
		}

		editor.update(() => {
			try {
				const mentions = getAllMentionNodes()

				if (pos1 >= mentions.length || pos2 >= mentions.length) {
					alert(
						`Invalid positions. There are only ${mentions.length} mentions (positions 1-${mentions.length})`
					)
					return
				}

				const mention1 = mentions[pos1]
				const mention2 = mentions[pos2]

				if (!mention1 || !mention2) {
					alert("Could not find mentions at specified positions")
					return
				}

				// Store the data from both mentions using getter methods
				const mention1Data = {
					mentionId: mention1.node.getMentionId(),
					mentionName: mention1.node.getMentionName(),
					mentionType: mention1.node.getMentionType()
				}

				const mention2Data = {
					mentionId: mention2.node.getMentionId(),
					mentionName: mention2.node.getMentionName(),
					mentionType: mention2.node.getMentionType()
				}

				// Swap the data using setter methods
				mention1.node.setMentionData(
					mention2Data.mentionId,
					mention2Data.mentionName,
					mention2Data.mentionType
				)
				mention2.node.setMentionData(
					mention1Data.mentionId,
					mention1Data.mentionName,
					mention1Data.mentionType
				)

				// Clear the input fields
				setPosition1("")
				setPosition2("")
				setIsOpen(false)

				console.log(`Swapped mentions at positions ${pos1 + 1} and ${pos2 + 1}`)
			} catch (error) {
				console.error("Error swapping mentions:", error)
				alert("Error swapping mentions. Please try again.")
			}
		})
	}, [editor, position1, position2, getAllMentionNodes])

	const getMentionList = useCallback(() => {
		let mentions: { name: string; type: string; position: number }[] = []

		editor.getEditorState().read(() => {
			mentions = getAllMentionNodes().map((mention, index) => ({
				name: mention.node.getMentionName(),
				type: mention.node.getMentionType(),
				position: index + 1
			}))
		})

		return mentions
	}, [editor, getAllMentionNodes])

	const mentionList = getMentionList()

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="flex items-center gap-2">
					<Hash className="w-4 h-4" />
					Swap Positions
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-96 p-0" align="start">
				<div className="p-4">
					<div className="flex items-center gap-2 mb-4">
						<Hash className="w-4 h-4" />
						<span className="font-medium">Swap Mention Positions</span>
					</div>

					{mentionCount === 0 ? (
						<div className="text-center py-4 text-muted-foreground">
							No mentions found in the editor
						</div>
					) : mentionCount < 2 ? (
						<div className="text-center py-4 text-muted-foreground">
							Need at least 2 mentions to swap positions
						</div>
					) : (
						<>
							<div className="space-y-4 mb-4">
								<div className="grid grid-cols-2 gap-3">
									<div>
										<label className="text-sm font-medium mb-1 block">
											Position 1
										</label>
										<input
											type="number"
											min="1"
											max={mentionCount}
											value={position1}
											onChange={(e) => setPosition1(e.target.value)}
											placeholder="1"
											className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
									<div>
										<label className="text-sm font-medium mb-1 block">
											Position 2
										</label>
										<input
											type="number"
											min="1"
											max={mentionCount}
											value={position2}
											onChange={(e) => setPosition2(e.target.value)}
											placeholder="2"
											className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>
								</div>

								<Button
									onClick={swapMentionPositions}
									className="w-full"
									disabled={!position1 || !position2}
								>
									Swap Positions
								</Button>
							</div>

							<Separator className="mb-4" />

							<div>
								<h4 className="text-sm font-medium mb-2">
									Current Mentions ({mentionCount})
								</h4>
								<div className="max-h-32 overflow-y-auto space-y-1">
									{mentionList.map((mention) => (
										<div
											key={`${mention.position}-${mention.name}`}
											className="flex items-center gap-2 p-2 bg-muted/50 rounded text-sm"
										>
											<span className="font-mono text-xs bg-background px-1.5 py-0.5 rounded">
												{mention.position}
											</span>
											{mention.type === "user" ? (
												<User className="w-3 h-3 text-blue-600" />
											) : (
												<Hash className="w-3 h-3 text-green-600" />
											)}
											<span className="flex-1">{mention.name}</span>
											<span className="text-xs text-muted-foreground capitalize">
												{mention.type}
											</span>
										</div>
									))}
								</div>
							</div>
						</>
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}

// Delete Mention Component
function DeleteMentionButton() {
	const [editor] = useLexicalComposerContext()
	const [deletePosition, setDeletePosition] = useState("")
	const [mentionCount, setMentionCount] = useState(0)
	const [isOpen, setIsOpen] = useState(false)

	// Update mention count when editor changes
	useEffect(() => {
		const unregister = editor.registerUpdateListener(() => {
			editor.getEditorState().read(() => {
				const root = $getRoot()
				let count = 0

				const countMentions = (node: any) => {
					if ($isMentionNode(node)) {
						count++
					}
					// Check if node has children before trying to get them
					if (node.getChildrenSize && node.getChildrenSize() > 0) {
						const children = node.getChildren()
						children.forEach(countMentions)
					}
				}

				countMentions(root)
				setMentionCount(count)
			})
		})
		return unregister
	}, [editor])

	const getAllMentionNodes = useCallback(() => {
		const mentions: { node: any; position: number }[] = []
		let position = 0

		const collectMentions = (node: any) => {
			if ($isMentionNode(node)) {
				mentions.push({ node, position })
				position++
			} else {
				// Check if node has children before trying to get them
				if (node.getChildrenSize && node.getChildrenSize() > 0) {
					const children = node.getChildren()
					children.forEach(collectMentions)
				}
			}
		}

		const root = $getRoot()
		collectMentions(root)
		return mentions
	}, [])

	const deleteMentionAtPosition = useCallback(() => {
		const pos = Number.parseInt(deletePosition) - 1 // Convert to 0-based index

		if (isNaN(pos)) {
			alert("Please enter a valid position number")
			return
		}

		if (pos < 0) {
			alert("Position number must be greater than 0")
			return
		}

		editor.update(() => {
			try {
				const mentions = getAllMentionNodes()

				if (pos >= mentions.length) {
					alert(
						`Invalid position. There are only ${mentions.length} mentions (positions 1-${mentions.length})`
					)
					return
				}

				const mentionToDelete = mentions[pos]

				if (!mentionToDelete) {
					alert("Could not find mention at specified position")
					return
				}

				const mentionName = mentionToDelete.node.getMentionName()
				const mentionType = mentionToDelete.node.getMentionType()

				// Remove the mention node
				mentionToDelete.node.remove()

				// Clear the input field
				setDeletePosition("")
				setIsOpen(false)

				console.log(
					`Deleted ${mentionType} mention "${mentionName}" at position ${pos + 1}`
				)
			} catch (error) {
				console.error("Error deleting mention:", error)
				alert("Error deleting mention. Please try again.")
			}
		})
	}, [editor, deletePosition, getAllMentionNodes])

	const getMentionList = useCallback(() => {
		let mentions: { name: string; type: string; position: number }[] = []

		editor.getEditorState().read(() => {
			mentions = getAllMentionNodes().map((mention, index) => ({
				name: mention.node.getMentionName(),
				type: mention.node.getMentionType(),
				position: index + 1
			}))
		})

		return mentions
	}, [editor, getAllMentionNodes])

	const mentionList = getMentionList()

	const handleQuickDelete = useCallback(
		(position: number) => {
			setDeletePosition(position.toString())
			// Trigger deletion immediately
			setTimeout(() => {
				const pos = position - 1 // Convert to 0-based index

				editor.update(() => {
					try {
						const mentions = getAllMentionNodes()
						const mentionToDelete = mentions[pos]

						if (mentionToDelete) {
							const mentionName = mentionToDelete.node.getMentionName()
							const mentionType = mentionToDelete.node.getMentionType()
							mentionToDelete.node.remove()
							console.log(
								`Deleted ${mentionType} mention "${mentionName}" at position ${position}`
							)
						}
					} catch (error) {
						console.error("Error deleting mention:", error)
					}
				})

				setDeletePosition("")
			}, 0)
		},
		[editor, getAllMentionNodes]
	)

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="flex items-center gap-2">
					<Trash2 className="w-4 h-4" />
					Delete Mention
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-96 p-0" align="start">
				<div className="p-4">
					<div className="flex items-center gap-2 mb-4">
						<Trash2 className="w-4 h-4" />
						<span className="font-medium">Delete Mention</span>
					</div>

					{mentionCount === 0 ? (
						<div className="text-center py-4 text-muted-foreground">
							No mentions found in the editor
						</div>
					) : (
						<>
							<div className="space-y-4 mb-4">
								<div>
									<label className="text-sm font-medium mb-1 block">
										Position to Delete
									</label>
									<input
										type="number"
										min="1"
										max={mentionCount}
										value={deletePosition}
										onChange={(e) => setDeletePosition(e.target.value)}
										placeholder="Enter position number"
										className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
									/>
								</div>

								<Button
									onClick={deleteMentionAtPosition}
									className="w-full bg-red-600 hover:bg-red-700"
									disabled={!deletePosition}
								>
									<Trash2 className="w-4 h-4 mr-2" />
									Delete Mention
								</Button>
							</div>

							<Separator className="mb-4" />

							<div>
								<h4 className="text-sm font-medium mb-2">
									Current Mentions ({mentionCount})
								</h4>
								<div className="max-h-40 overflow-y-auto space-y-1">
									{mentionList.map((mention) => (
										<div
											key={`${mention.position}-${mention.name}`}
											className="flex items-center gap-2 p-2 bg-muted/50 rounded text-sm group hover:bg-red-50"
										>
											<span className="font-mono text-xs bg-background px-1.5 py-0.5 rounded">
												{mention.position}
											</span>
											{mention.type === "user" ? (
												<User className="w-3 h-3 text-blue-600" />
											) : (
												<Hash className="w-3 h-3 text-green-600" />
											)}
											<span className="flex-1">{mention.name}</span>
											<span className="text-xs text-muted-foreground capitalize">
												{mention.type}
											</span>
											<Button
												variant="ghost"
												size="sm"
												className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
												onClick={() => handleQuickDelete(mention.position)}
												title={`Delete ${mention.name}`}
											>
												<Trash2 className="w-3 h-3" />
											</Button>
										</div>
									))}
								</div>
							</div>

							<div className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
								<strong>Warning:</strong> Deleting a mention cannot be undone.
								Use Ctrl+Z to undo if needed.
							</div>
						</>
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}

// Toolbar Component
function EditorToolbar() {
	const [editor] = useLexicalComposerContext()

	const formatText = useCallback(
		(format: TextFormatType) => {
			editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
			editor.focus()
		},
		[editor]
	)

	return (
		<div className="flex items-center gap-2 p-3 border-b bg-muted/30">
			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => formatText("bold")}
					className="h-8 w-8 p-0"
					title="Bold"
				>
					<Bold className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => formatText("italic")}
					className="h-8 w-8 p-0"
					title="Italic"
				>
					<Italic className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => formatText("underline")}
					className="h-8 w-8 p-0"
					title="Underline"
				>
					<Underline className="w-4 h-4" />
				</Button>
			</div>

			<Separator orientation="vertical" className="h-6" />

			<AddMentionButton />
			<MentionPositionSwapper />
			<DeleteMentionButton />

			<Separator orientation="vertical" className="h-6" />

			<div className="flex items-center gap-1">
				<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="List">
					<List className="w-4 h-4" />
				</Button>
				<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Image">
					<ImageIcon className="w-4 h-4" />
				</Button>
				<Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Link">
					<Link className="w-4 h-4" />
				</Button>
			</div>
		</div>
	)
}

// Drag and Drop Plugin
function DragDropPlugin() {
	const [editor] = useLexicalComposerContext()
	const [isDragOver, setIsDragOver] = useState(false)

	useEffect(() => {
		const contentEditable = editor.getRootElement()
		if (!contentEditable) return

		const handleDragOver = (e: DragEvent) => {
			e.preventDefault()
			e.dataTransfer!.dropEffect = "move"
			setIsDragOver(true)
		}

		const handleDragLeave = (e: DragEvent) => {
			// Only set drag over to false if we're leaving the editor entirely
			if (!contentEditable.contains(e.relatedTarget as Node)) {
				setIsDragOver(false)
				setHoveredMention(null)
			}
		}

		const handleDrop = (e: DragEvent) => {
			e.preventDefault()
			setIsDragOver(false)
			setHoveredMention(null)
			setDraggedMention(null)

			const mentionData = e.dataTransfer?.getData("application/lexical-mention")
			if (!mentionData) return

			try {
				const draggedMention: DraggedMention = JSON.parse(mentionData)
				const dropTargetKey = getDropTargetMention()

				editor.update(() => {
					const sourceNode = $getNodeByKey(
						draggedMention.sourceNodeKey
					) as MentionNode
					if (!sourceNode || !$isMentionNode(sourceNode)) return

					// Check if this is a mention-to-mention swap
					if (dropTargetKey) {
						const targetNode = $getNodeByKey(dropTargetKey) as MentionNode
						if (targetNode && $isMentionNode(targetNode)) {
							// Perform the swap using getter and setter methods
							const sourceData = {
								mentionId: sourceNode.getMentionId(),
								mentionName: sourceNode.getMentionName(),
								mentionType: sourceNode.getMentionType()
							}

							const targetData = {
								mentionId: targetNode.getMentionId(),
								mentionName: targetNode.getMentionName(),
								mentionType: targetNode.getMentionType()
							}

							// Swap the data using setter methods
							sourceNode.setMentionData(
								targetData.mentionId,
								targetData.mentionName,
								targetData.mentionType
							)
							targetNode.setMentionData(
								sourceData.mentionId,
								sourceData.mentionName,
								sourceData.mentionType
							)

							setDropTargetMention(null)
							return
						}
					}

					// Regular drop operation (not on another mention)
					// Create a range selection at the drop point
					const range = document.caretRangeFromPoint(e.clientX, e.clientY)
					if (!range) return

					// Find the closest text node and offset
					let targetNode = range.startContainer
					let offset = range.startOffset

					// If we're in an element node, find the appropriate text node
					if (targetNode.nodeType === Node.ELEMENT_NODE) {
						const element = targetNode as Element
						const textNodes: Text[] = []

						// Collect all text nodes
						const walker = document.createTreeWalker(
							element,
							NodeFilter.SHOW_TEXT,
							null
						)
						let node
						while ((node = walker.nextNode())) {
							textNodes.push(node as Text)
						}

						if (textNodes.length > 0) {
							// Find the closest text node to the drop point
							let closestNode = textNodes[0]
							let closestDistance = Number.POSITIVE_INFINITY

							textNodes.forEach((textNode) => {
								const textRange = document.createRange()
								textRange.selectNodeContents(textNode)
								const rect = textRange.getBoundingClientRect()
								const distance = Math.abs(e.clientX - rect.left)

								if (distance < closestDistance) {
									closestDistance = distance
									closestNode = textNode
								}
							})

							targetNode = closestNode
							// Calculate offset based on position
							const textRange = document.createRange()
							textRange.selectNodeContents(closestNode)
							const rect = textRange.getBoundingClientRect()
							const relativeX = e.clientX - rect.left
							const charWidth = rect.width / closestNode.textContent!.length
							offset = Math.round(relativeX / charWidth)
							offset = Math.max(
								0,
								Math.min(offset, closestNode.textContent!.length)
							)
						}
					}

					// Find the corresponding Lexical node
					const root = $getRoot()
					let lexicalTextNode: any = null
					let lexicalOffset = 0

					// Walk through all nodes to find the one containing our target DOM node
					const findLexicalNode = (node: any): boolean => {
						if ($isTextNode(node)) {
							const domNode = editor.getElementByKey(node.getKey())
							if (
								domNode &&
								(domNode === targetNode || domNode.contains(targetNode))
							) {
								lexicalTextNode = node
								lexicalOffset = offset
								return true
							}
						}

						if (node.getChildrenSize && node.getChildrenSize() > 0) {
							const children = node.getChildren()
							for (const child of children) {
								if (findLexicalNode(child)) return true
							}
						}
						return false
					}

					findLexicalNode(root)

					// Remove the source mention
					sourceNode.remove()

					// Create new mention node
					const newMentionNode = $createMentionNode(
						draggedMention.mentionId,
						draggedMention.mentionName,
						draggedMention.mentionType
					)

					if (lexicalTextNode && $isTextNode(lexicalTextNode)) {
						// Split the text node at the drop position
						const textContent = lexicalTextNode.getTextContent()
						const beforeText = textContent.slice(0, lexicalOffset)
						const afterText = textContent.slice(lexicalOffset)

						// Update the current text node with before text
						lexicalTextNode.setTextContent(beforeText)

						// Insert the mention
						lexicalTextNode.insertAfter(newMentionNode)

						// Add after text if it exists
						if (afterText) {
							const afterTextNode = $createTextNode(afterText)
							newMentionNode.insertAfter(afterTextNode)
						}

						// Add space after mention
						const spaceNode = $createTextNode(" ")
						if (afterText) {
							const afterTextNode = newMentionNode.getNextSibling()
							if (afterTextNode && $isTextNode(afterTextNode)) {
								afterTextNode.insertBefore(spaceNode)
								spaceNode.select(1, 1)
							}
						} else {
							newMentionNode.insertAfter(spaceNode)
							spaceNode.select(1, 1)
						}
					} else {
						// Fallback: append to the end of the root
						const lastChild = root.getLastChild()
						if (lastChild) {
							lastChild.insertAfter(newMentionNode)
						} else {
							root.append(newMentionNode)
						}

						const spaceNode = $createTextNode(" ")
						newMentionNode.insertAfter(spaceNode)
						spaceNode.select(1, 1)
					}
				})

				setDropTargetMention(null)
			} catch (error) {
				console.error("Error handling mention drop:", error)
			}
		}

		contentEditable.addEventListener("dragover", handleDragOver)
		contentEditable.addEventListener("dragleave", handleDragLeave)
		contentEditable.addEventListener("drop", handleDrop)

		return () => {
			contentEditable.removeEventListener("dragover", handleDragOver)
			contentEditable.removeEventListener("dragleave", handleDragLeave)
			contentEditable.removeEventListener("drop", handleDrop)
		}
	}, [editor])

	// Add visual feedback for drag over state
	useEffect(() => {
		const contentEditable = editor.getRootElement()
		if (!contentEditable) return

		if (isDragOver) {
			contentEditable.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
			contentEditable.style.borderColor = "rgb(59, 130, 246)"
		} else {
			contentEditable.style.backgroundColor = ""
			contentEditable.style.borderColor = ""
		}
	}, [isDragOver, editor])

	return null
}

// Mention Plugin
function MentionPlugin() {
	const [editor] = useLexicalComposerContext()
	const [mentionQuery, setMentionQuery] = useState<string | null>(null)
	const [mentionPosition, setMentionPosition] = useState<{
		x: number
		y: number
	} | null>(null)
	const [filteredMentions, setFilteredMentions] = useState<Mention[]>([])

	const checkForMentionTrigger = useCallback(() => {
		const editorState = editor.getEditorState()
		editorState.read(() => {
			const selection = $getSelection()
			if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
				setMentionQuery(null)
				return
			}

			const anchor = selection.anchor
			const anchorNode = anchor.getNode()

			if ($isTextNode(anchorNode)) {
				const textContent = anchorNode.getTextContent()
				const anchorOffset = anchor.offset

				// Find the last @ before the cursor
				let mentionStart = -1
				for (let i = anchorOffset - 1; i >= 0; i--) {
					if (textContent[i] === "@") {
						mentionStart = i
						break
					}
					if (textContent[i] === " " || textContent[i] === "\n") {
						break
					}
				}

				if (mentionStart !== -1) {
					const query = textContent.slice(mentionStart + 1, anchorOffset)
					setMentionQuery(query)

					// Get cursor position for popover
					const domSelection = window.getSelection()
					if (domSelection && domSelection.rangeCount > 0) {
						const range = domSelection.getRangeAt(0)
						const rect = range.getBoundingClientRect()
						setMentionPosition({ x: rect.left, y: rect.bottom + 5 })
					}
				} else {
					setMentionQuery(null)
				}
			}
		})
	}, [editor])

	useEffect(() => {
		if (mentionQuery !== null) {
			const filtered = SAMPLE_MENTIONS.filter((mention) =>
				mention.name.toLowerCase().includes(mentionQuery.toLowerCase())
			)
			setFilteredMentions(filtered)
		}
	}, [mentionQuery])

	useEffect(() => {
		const unregister = editor.registerUpdateListener(() => {
			checkForMentionTrigger()
		})
		return unregister
	}, [editor, checkForMentionTrigger])

	const insertMention = useCallback(
		(mention: Mention) => {
			editor.update(() => {
				const selection = $getSelection()
				if (!$isRangeSelection(selection)) return

				const anchor = selection.anchor
				const anchorNode = anchor.getNode()

				if ($isTextNode(anchorNode)) {
					const textContent = anchorNode.getTextContent()
					const anchorOffset = anchor.offset

					// Find the @ symbol
					let mentionStart = -1
					for (let i = anchorOffset - 1; i >= 0; i--) {
						if (textContent[i] === "@") {
							mentionStart = i
							break
						}
					}

					if (mentionStart !== -1) {
						// Create the mention node
						const mentionNode = $createMentionNode(
							mention.id,
							mention.name,
							mention.type
						)

						// Split the text content
						const beforeText = textContent.slice(0, mentionStart)
						const afterText = textContent.slice(anchorOffset)

						// Update the current text node with the before text
						anchorNode.setTextContent(beforeText)

						// Insert the mention node after the current text node
						anchorNode.insertAfter(mentionNode)

						// If there's text after the mention, create a new text node
						if (afterText) {
							const afterTextNode = $createTextNode(afterText)
							mentionNode.insertAfter(afterTextNode)
							// Set selection to the beginning of the after text
							afterTextNode.select(0, 0)
						} else {
							// Create a space after the mention and select it
							const spaceNode = $createTextNode(" ")
							mentionNode.insertAfter(spaceNode)
							spaceNode.select(1, 1)
						}
					}
				}
			})

			setMentionQuery(null)
			setMentionPosition(null)
		},
		[editor]
	)

	if (mentionQuery === null || !mentionPosition) return null

	return (
		<div
			className="fixed z-50"
			style={{ left: mentionPosition.x, top: mentionPosition.y }}
		>
			<Card className="w-64 max-h-48 overflow-y-auto">
				<CardContent className="p-2">
					{filteredMentions.length > 0 ? (
						filteredMentions.map((mention) => (
							<Button
								key={mention.id}
								variant="ghost"
								className="w-full justify-start h-auto p-2 mb-1"
								onClick={() => insertMention(mention)}
							>
								<div className="flex items-center gap-2">
									{mention.type === "user" ? (
										<User className="w-4 h-4" />
									) : (
										<Hash className="w-4 h-4" />
									)}
									<span>{mention.name}</span>
								</div>
							</Button>
						))
					) : (
						<div className="p-2 text-sm text-muted-foreground">
							No mentions found
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

// Command Plugin
function CommandPlugin() {
	const [editor] = useLexicalComposerContext()
	const [commandQuery, setCommandQuery] = useState<string | null>(null)
	const [commandPosition, setCommandPosition] = useState<{
		x: number
		y: number
	} | null>(null)
	const [filteredCommands, setFilteredCommands] = useState<Command[]>([])

	const commands: Command[] = useMemo(
		() => [
			{
				id: "bold",
				name: "Bold",
				description: "Make text bold",
				icon: <Bold className="w-4 h-4" />,
				action: () => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
				}
			},
			{
				id: "italic",
				name: "Italic",
				description: "Make text italic",
				icon: <Italic className="w-4 h-4" />,
				action: () => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
				}
			},
			{
				id: "underline",
				name: "Underline",
				description: "Underline text",
				icon: <Underline className="w-4 h-4" />,
				action: () => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
				}
			},
			{
				id: "list",
				name: "Bullet List",
				description: "Create a bullet list",
				icon: <List className="w-4 h-4" />,
				action: () => {
					console.log("Create bullet list")
				}
			},
			{
				id: "image",
				name: "Image",
				description: "Insert an image",
				icon: <ImageIcon className="w-4 h-4" />,
				action: () => {
					console.log("Insert image")
				}
			},
			{
				id: "link",
				name: "Link",
				description: "Insert a link",
				icon: <Link className="w-4 h-4" />,
				action: () => {
					console.log("Insert link")
				}
			}
		],
		[editor]
	)

	const checkForCommandTrigger = useCallback(() => {
		const editorState = editor.getEditorState()
		editorState.read(() => {
			const selection = $getSelection()
			if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
				setCommandQuery(null)
				return
			}

			const anchor = selection.anchor
			const anchorNode = anchor.getNode()

			if ($isTextNode(anchorNode)) {
				const textContent = anchorNode.getTextContent()
				const anchorOffset = anchor.offset

				// Find the last / before the cursor
				let commandStart = -1
				for (let i = anchorOffset - 1; i >= 0; i--) {
					if (textContent[i] === "/") {
						commandStart = i
						break
					}
					if (textContent[i] === " " || textContent[i] === "\n") {
						break
					}
				}

				if (commandStart !== -1) {
					const query = textContent.slice(commandStart + 1, anchorOffset)
					setCommandQuery(query)

					// Get cursor position for popover
					const domSelection = window.getSelection()
					if (domSelection && domSelection.rangeCount > 0) {
						const range = domSelection.getRangeAt(0)
						const rect = range.getBoundingClientRect()
						setCommandPosition({ x: rect.left, y: rect.bottom + 5 })
					}
				} else {
					setCommandQuery(null)
				}
			}
		})
	}, [editor])

	useEffect(() => {
		if (commandQuery !== null) {
			const filtered = commands.filter(
				(command) =>
					command.name.toLowerCase().includes(commandQuery.toLowerCase()) ||
					command.description.toLowerCase().includes(commandQuery.toLowerCase())
			)
			setFilteredCommands(filtered)
		}
	}, [commandQuery, commands])

	useEffect(() => {
		const unregister = editor.registerUpdateListener(() => {
			checkForCommandTrigger()
		})
		return unregister
	}, [editor, checkForCommandTrigger])

	const executeCommand = useCallback(
		(command: Command) => {
			editor.update(() => {
				const selection = $getSelection()
				if (!$isRangeSelection(selection)) return

				const anchor = selection.anchor
				const anchorNode = anchor.getNode()

				if ($isTextNode(anchorNode)) {
					const textContent = anchorNode.getTextContent()
					const anchorOffset = anchor.offset

					// Find the / symbol
					let commandStart = -1
					for (let i = anchorOffset - 1; i >= 0; i--) {
						if (textContent[i] === "/") {
							commandStart = i
							break
						}
					}

					if (commandStart !== -1) {
						// Remove the command text
						const beforeText = textContent.slice(0, commandStart)
						const afterText = textContent.slice(anchorOffset)

						anchorNode.setTextContent(beforeText + afterText)

						// Set cursor position after removing the command
						const newOffset = commandStart
						anchorNode.select(newOffset, newOffset)
					}
				}
			})

			// Execute the command action
			command.action()

			setCommandQuery(null)
			setCommandPosition(null)
		},
		[editor]
	)

	if (commandQuery === null || !commandPosition) return null

	return (
		<div
			className="fixed z-50"
			style={{ left: commandPosition.x, top: commandPosition.y }}
		>
			<Card className="w-80 max-h-64 overflow-y-auto">
				<CardContent className="p-2">
					<div className="flex items-center gap-2 p-2 mb-2">
						<Settings className="w-4 h-4" />
						<span className="text-sm font-medium">Commands</span>
					</div>
					<Separator className="mb-2" />
					{filteredCommands.length > 0 ? (
						filteredCommands.map((command) => (
							<Button
								key={command.id}
								variant="ghost"
								className="w-full justify-start h-auto p-2 mb-1"
								onClick={() => executeCommand(command)}
							>
								<div className="flex items-center gap-3">
									{command.icon}
									<div className="text-left">
										<div className="font-medium">{command.name}</div>
										<div className="text-xs text-muted-foreground">
											{command.description}
										</div>
									</div>
								</div>
							</Button>
						))
					) : (
						<div className="p-2 text-sm text-muted-foreground">
							No commands found
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

// Main Editor Component
export function MyLexicalEditor() {
	const initialConfig = {
		namespace: "LexicalEditor",
		theme: {
			paragraph: "mb-1",
			text: {
				bold: "font-bold",
				italic: "italic",
				underline: "underline"
			}
		},
		onError: (error: Error) => {
			console.error("Lexical Error:", error)
		},
		nodes: [MentionNode]
	}

	return (
		<div className="w-full max-w-2xl mx-auto p-4">
			<div className="border rounded-lg overflow-hidden">
				<LexicalComposer initialConfig={initialConfig}>
					<EditorToolbar />
					<div className="relative">
						<RichTextPlugin
							contentEditable={
								<ContentEditable className="min-h-[200px] p-4 outline-none resize-none transition-colors" />
							}
							placeholder={
								<div className="absolute top-4 left-4 text-muted-foreground pointer-events-none">
									Type @ to mention someone, / for commands, or use the toolbar
									to add/manage mentions...
								</div>
							}
							ErrorBoundary={CustomErrorBoundary}
						/>
						<HistoryPlugin />
						<OnChangePlugin onChange={() => {}} />
						<DragDropPlugin />
						<MentionPlugin />
						<CommandPlugin />
					</div>
				</LexicalComposer>
			</div>

			<div className="mt-4 text-sm text-muted-foreground">
				<p>
					<strong>Tips:</strong>
				</p>
				<ul className="list-disc list-inside space-y-1">
					<li>
						Type <code>@</code> to mention users or channels
					</li>
					<li>
						Type <code>/</code> to access formatting commands
					</li>
					<li>
						<strong>Click Add Mention</strong> button to insert mentions at
						cursor position
					</li>
					<li>
						<strong>Click Swap Positions</strong> to swap two mentions by their
						position numbers
					</li>
					<li>
						<strong>Click Delete Mention</strong> to remove mentions by position
						number
					</li>
					<li>
						<strong>Drag mentions over other mentions</strong> to swap their
						positions
					</li>
					<li>
						<strong>Drag mentions to empty space</strong> to move them to that
						exact position
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MyLexicalEditor
