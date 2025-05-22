"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin"
import {
	$createNodeSelection,
	$createTextNode,
	$getNodeByKey,
	$insertNodes,
	$setSelection,
	TextNode
} from "lexical"
import {
	AtSign,
	Calendar,
	Command,
	FileText,
	Hash,
	Image,
	Pencil,
	Smile,
	User,
	UserPlus
} from "lucide-react"

// Custom MentionNode for styled mentions and commands
class MentionNode extends TextNode {
	static getType() {
		return "mention"
	}

	static clone(node) {
		return new MentionNode(node.__text, node.__key)
	}

	constructor(text, key) {
		super(text, key)
	}

	createDOM(config) {
		const dom = super.createDOM(config)
		dom.className = "mention-node"
		return dom
	}

	updateDOM(prevNode, dom, config) {
		return false
	}

	exportJSON() {
		return {
			...super.exportJSON(),
			type: "mention"
		}
	}

	static importJSON(serializedNode) {
		const node = $createMentionNode(serializedNode.text)
		return node
	}
}

function $createMentionNode(text) {
	return new MentionNode(text).setMode("segmented")
}

// MentionPlugin component
function MentionPlugin({ setMentionInfo }) {
	const [editor] = useLexicalComposerContext()

	useEffect(() => {
		const removeListener = editor.registerTextContentListener((listener) => {
			if (!listener) setMentionInfo(null)
		})
		const removeTransform = editor.registerNodeTransform(
			TextNode,
			(textNode) => {
				const textContent = textNode.getTextContent()
				const lastAtIndex = textContent.lastIndexOf("@")
				const lastSlashIndex = textContent.lastIndexOf("/")

				if (lastAtIndex !== -1) {
					const query = textContent.substring(lastAtIndex + 1)
					if (lastAtIndex === textContent.length - 1 || query.length > 0) {
						const textNodeKey = textNode.getKey()
						const offset = textContent.length
						setMentionInfo({
							type: "@",
							query,
							active: true,
							nodeKey: textNodeKey,
							offset
						})
						return
					}
				} else if (lastSlashIndex !== -1) {
					const query = textContent.substring(lastSlashIndex + 1)
					if (lastSlashIndex === textContent.length - 1 || query.length > 0) {
						const textNodeKey = textNode.getKey()
						const offset = textContent.length
						setMentionInfo({
							type: "/",
							query,
							active: true,
							nodeKey: textNodeKey,
							offset
						})
						return
					}
				}
				setMentionInfo(null)
			}
		)

		return () => {
			removeTransform()
			removeListener()
		}
	}, [editor, setMentionInfo])

	return null
}

// Main component
export default function MentionInput() {
	const [mentionInfo, setMentionInfo] = useState(null)
	const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })
	const containerRef = useRef(null) // Renamed to avoid confusion
	const popoverRef = useRef(null)
	const [editor] = useLexicalComposerContext() // Get editor instance from context

	const updatePopoverPosition = useCallback(() => {
		if (!mentionInfo || !containerRef.current) return

		const selection = window.getSelection()
		if (selection.rangeCount === 0) return

		const range = selection.getRangeAt(0)
		const rect = range.getBoundingClientRect()

		setPopoverPosition({
			top: rect.bottom + window.scrollY,
			left: rect.left + window.scrollX
		})
	}, [mentionInfo])

	useEffect(() => {
		if (mentionInfo?.active) {
			updatePopoverPosition()
		}
	}, [mentionInfo, updatePopoverPosition])

	// Dummy data for mentions and commands
	const users = [
		{ id: 1, name: "John Doe", username: "johndoe" },
		{ id: 2, name: "Jane Smith", username: "janesmith" },
		{ id: 3, name: "Alex Johnson", username: "alexj" },
		{ id: 4, name: "Taylor Wilson", username: "taylor" },
		{ id: 5, name: "Morgan Lee", username: "morganlee" }
	]

	const commands = [
		{ id: 1, name: "Insert mention", icon: <AtSign size={16} /> },
		{ id: 2, name: "Add hashtag", icon: <Hash size={16} /> },
		{ id: 3, name: "Invite user", icon: <UserPlus size={16} /> },
		{ id: 4, name: "Edit message", icon: <Pencil size={16} /> },
		{ id: 5, name: "Insert emoji", icon: <Smile size={16} /> },
		{ id: 6, name: "Add image", icon: <Image size={16} /> },
		{ id: 7, name: "Insert document", icon: <FileText size={16} /> },
		{ id: 8, name: "Schedule", icon: <Calendar size={16} /> }
	]

	// Filter users and commands based on query
	const filteredUsers =
		mentionInfo?.type === "@"
			? users.filter(
					(user) =>
						user.name.toLowerCase().includes(mentionInfo.query.toLowerCase()) ||
						user.username
							.toLowerCase()
							.includes(mentionInfo.query.toLowerCase())
				)
			: []

	const filteredCommands =
		mentionInfo?.type === "/"
			? commands.filter((cmd) =>
					cmd.name.toLowerCase().includes(mentionInfo.query.toLowerCase())
				)
			: []

	const initialConfig = {
		namespace: "MentionInput",
		theme: {
			paragraph: "mb-1",
			mention: "bg-blue-100 px-2 py-1 rounded-md inline-block"
		},
		nodes: [MentionNode],
		onError: (error) => console.error(error)
	}

	const handleInsertMention = (user) => {
		if (!mentionInfo?.nodeKey) return

		editor.update(() => {
			const node = $getNodeByKey(mentionInfo.nodeKey)
			if (!node) return

			// Split the text node at the mention point
			const textContent = node.getTextContent()
			const atIndex = textContent.lastIndexOf("@")
			if (atIndex !== -1) {
				const [before] = node.splitText(atIndex)
				if (before) {
					before.remove()
				}
			}

			// Insert the mention node
			const mentionNode = $createMentionNode(`@${user.username}`)
			$insertNodes([mentionNode])

			// Add a space after the mention
			const spaceNode = $createTextNode(" ")
			$insertNodes([spaceNode])

			// Set selection after the inserted nodes
			const selection = $createNodeSelection()
			selection.add(spaceNode.getKey())
			$setSelection(selection)
		})

		setMentionInfo(null)
	}

	const handleInsertCommand = (command) => {
		if (!mentionInfo?.nodeKey) return

		editor.update(() => {
			const node = $getNodeByKey(mentionInfo.nodeKey)
			if (!node) return

			// Split the text node at the command point
			const textContent = node.getTextContent()
			const slashIndex = textContent.lastIndexOf("/")
			if (slashIndex !== -1) {
				const [before] = node.splitText(slashIndex)
				if (before) {
					before.remove()
				}
			}

			// Insert the command node
			const commandNode = $createMentionNode(`/${command.name}`)
			$insertNodes([commandNode])

			// Add a space after the command
			const spaceNode = $createTextNode(" ")
			$insertNodes([spaceNode])

			// Set selection after the inserted nodes
			const selection = $createNodeSelection()
			selection.add(spaceNode.getKey())
			$setSelection(selection)
		})

		setMentionInfo(null)
	}

	return (
		<div className="h-full w-screen bg-white">
			<div className="w-full h-screen bg-white">
				<div className="w-full max-w-2xl mx-auto mt-8">
					<div
						className="border border-gray-300 rounded-md shadow-sm p-4"
						ref={containerRef}
					>
						<LexicalComposer initialConfig={initialConfig}>
							<PlainTextPlugin
								contentEditable={
									<ContentEditable className="min-h-24 focus:outline-none" />
								}
								placeholder={
									<div className="text-gray-400">
										Type @ to mention users or / for commands...
									</div>
								}
							/>
							<HistoryPlugin />
							<OnChangePlugin
								onChange={(editorState) => {
									editorState.read(() => {
										updatePopoverPosition()
									})
								}}
							/>
							<MentionPlugin setMentionInfo={setMentionInfo} />
						</LexicalComposer>
					</div>

					{mentionInfo?.active && (
						<div
							ref={popoverRef}
							className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden w-64"
							style={{
								top: `${popoverPosition.top}px`,
								left: `${popoverPosition.left}px`
							}}
						>
							<div className="p-2 bg-gray-50 border-b border-gray-200">
								<div className="flex items-center">
									{mentionInfo.type === "@" ? (
										<>
											<User size={16} className="mr-2 text-gray-500" />
											<span className="text-sm font-medium">
												Mention a user
											</span>
										</>
									) : (
										<>
											<Command size={16} className="mr-2 text-gray-500" />
											<span className="text-sm font-medium">Commands</span>
										</>
									)}
								</div>
							</div>

							<div className="max-h-48 overflow-y-auto">
								{mentionInfo.type === "@" ? (
									filteredUsers.length > 0 ? (
										filteredUsers.map((user) => (
											<div
												key={user.id}
												className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
												onClick={() => handleInsertMention(user)}
											>
												<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
													<span className="text-blue-500 font-medium">
														{user.name[0]}
													</span>
												</div>
												<div>
													<div className="font-medium">{user.name}</div>
													<div className="text-sm text-gray-500">
														@{user.username}
													</div>
												</div>
											</div>
										))
									) : (
										<div className="p-3 text-center text-gray-500">
											No users found
										</div>
									)
								) : filteredCommands.length > 0 ? (
									filteredCommands.map((cmd) => (
										<div
											key={cmd.id}
											className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
											onClick={() => handleInsertCommand(cmd)}
										>
											<div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
												{cmd.icon}
											</div>
											<div className="font-medium">{cmd.name}</div>
										</div>
									))
								) : (
									<div className="p-3 text-center text-gray-500">
										No commands found
									</div>
								)}
							</div>
						</div>
					)}

					<div className="mt-4 text-sm text-gray-500">
						<p>
							Try typing <strong>@</strong> to mention a user or{" "}
							<strong>/</strong> to use a command.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
