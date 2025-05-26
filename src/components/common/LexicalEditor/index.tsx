"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import {
	$createTextNode,
	$getSelection,
	$isRangeSelection,
	$isTextNode,
	FORMAT_TEXT_COMMAND
} from "lexical"
import {
	Bold,
	Hash,
	ImageIcon,
	Italic,
	Link,
	List,
	Settings,
	Underline,
	User
} from "lucide-react"

import { $createMentionNode, MentionNode } from "./MentionNode"

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
				const focus = selection.focus
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
			<div className="border rounded-lg">
				<LexicalComposer initialConfig={initialConfig}>
					<div className="relative">
						<RichTextPlugin
							contentEditable={
								<ContentEditable className="min-h-[200px] p-4 outline-none resize-none" />
							}
							placeholder={
								<div className="absolute top-4 left-4 text-muted-foreground pointer-events-none">
									Type @ to mention someone or / for commands...
								</div>
							}
							ErrorBoundary={CustomErrorBoundary}
						/>
						<HistoryPlugin />
						<OnChangePlugin onChange={() => {}} />
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
					<li>Use arrow keys to navigate through suggestions</li>
				</ul>
			</div>
		</div>
	)
}

export default MyLexicalEditor
