"use client"

import type React from "react"
import { useEffect, useState } from "react"

import {
	DecoratorNode,
	type EditorConfig,
	type LexicalEditor,
	type LexicalNode,
	type NodeKey,
	type SerializedLexicalNode,
	type Spread
} from "lexical"
import { Hash, User } from "lucide-react"

export interface MentionPayload {
	mentionId: string
	mentionName: string
	mentionType: "user" | "channel"
	key?: NodeKey
}

export type SerializedMentionNode = Spread<
	{
		mentionId: string
		mentionName: string
		mentionType: "user" | "channel"
		type: "mention"
		version: 1
	},
	SerializedLexicalNode
>

// Global state for drag operations
let draggedMentionKey: string | null = null
let hoveredMentionKey: string | null = null
let dropTargetMentionKey: string | null = null
const mentionHoverCallbacks = new Set<(key: string | null) => void>()

export const setDraggedMention = (key: string | null) => {
	draggedMentionKey = key
}

export const getDraggedMention = () => draggedMentionKey

export const setHoveredMention = (key: string | null) => {
	hoveredMentionKey = key
	mentionHoverCallbacks.forEach((callback) => callback(key))
}

export const getHoveredMention = () => hoveredMentionKey

export const setDropTargetMention = (key: string | null) => {
	dropTargetMentionKey = key
}

export const getDropTargetMention = () => dropTargetMentionKey

export const subscribeMentionHover = (
	callback: (key: string | null) => void
) => {
	mentionHoverCallbacks.add(callback)
	return () => mentionHoverCallbacks.delete(callback)
}

function MentionComponent({
	mentionId,
	mentionName,
	mentionType,
	nodeKey,
	editor
}: {
	mentionId: string
	mentionName: string
	mentionType: "user" | "channel"
	nodeKey: NodeKey
	editor: LexicalEditor
}) {
	const [isHovered, setIsHovered] = useState(false)
	const [isDragging, setIsDragging] = useState(false)

	// Subscribe to hover state changes
	useEffect(() => {
		const unsubscribe = subscribeMentionHover((hoveredKey) => {
			setIsHovered(hoveredKey === nodeKey)
		})
		return () => {
			unsubscribe()
		}
	}, [nodeKey])

	const baseColor =
		mentionType === "user"
			? "bg-blue-100 text-blue-800 border-blue-200"
			: "bg-green-100 text-green-800 border-green-200"

	const hoverColor =
		mentionType === "user"
			? "bg-blue-200 text-blue-900 border-blue-300"
			: "bg-green-200 text-green-900 border-green-300"

	const dragColor =
		mentionType === "user"
			? "bg-blue-50 text-blue-600 border-blue-100"
			: "bg-green-50 text-green-600 border-green-100"

	// Determine the current styling based on state
	let currentColor = baseColor
	let opacity = "opacity-100"
	let transform = ""

	if (isDragging) {
		currentColor = dragColor
		opacity = "opacity-60"
	} else if (isHovered && draggedMentionKey && draggedMentionKey !== nodeKey) {
		currentColor = hoverColor
		opacity = "opacity-70"
		transform = "scale-105"
	}

	const Icon = mentionType === "user" ? User : Hash

	const handleDragStart = (e: React.DragEvent) => {
		setDraggedMention(nodeKey)
		setIsDragging(true)

		e.dataTransfer.setData(
			"application/lexical-mention",
			JSON.stringify({
				mentionId,
				mentionName,
				mentionType,
				sourceNodeKey: nodeKey
			})
		)
		e.dataTransfer.effectAllowed = "move"

		// Create custom drag image
		const dragImage = e.currentTarget.cloneNode(true) as HTMLElement
		dragImage.style.opacity = "0.8"
		dragImage.style.transform = "rotate(5deg)"
		e.dataTransfer.setDragImage(dragImage, 0, 0)
	}

	const handleDragEnd = (e: React.DragEvent) => {
		setDraggedMention(null)
		setHoveredMention(null)
		setDropTargetMention(null)
		setIsDragging(false)
	}

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault()
		if (draggedMentionKey && draggedMentionKey !== nodeKey) {
			setHoveredMention(nodeKey)
		}
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
		if (draggedMentionKey && draggedMentionKey !== nodeKey) {
			setHoveredMention(nodeKey)
		}
	}

	const handleDragLeave = (e: React.DragEvent) => {
		// Only clear hover if we're actually leaving this element
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX
		const y = e.clientY

		if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
			if (hoveredMentionKey === nodeKey) {
				setHoveredMention(null)
			}
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const mentionData = e.dataTransfer?.getData("application/lexical-mention")
		if (!mentionData) return

		try {
			const draggedMention = JSON.parse(mentionData)

			// Only handle swap if this is a different mention
			if (draggedMention.sourceNodeKey !== nodeKey) {
				setDropTargetMention(nodeKey)
			}
		} catch (error) {
			console.error("Error parsing dragged mention data:", error)
		}
	}

	return (
		<span
			className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border cursor-move transition-all duration-200 ${currentColor} ${opacity} hover:scale-105`}
			style={{ transform }}
			contentEditable={false}
			suppressContentEditableWarning={true}
			draggable={true}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragEnter={handleDragEnter}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			title={`Drag to move ${mentionType}: ${mentionName}${isHovered ? " (will swap positions)" : ""}`}
			data-mention-key={nodeKey}
		>
			<Icon className="w-3 h-3" />
			{mentionName}
		</span>
	)
}

export class MentionNode extends DecoratorNode<React.JSX.Element> {
	__mentionId: string
	__mentionName: string
	__mentionType: "user" | "channel"

	static getType(): string {
		return "mention"
	}

	static clone(node: MentionNode): MentionNode {
		return new MentionNode(
			node.__mentionId,
			node.__mentionName,
			node.__mentionType,
			node.__key
		)
	}

	static importJSON(serializedNode: SerializedMentionNode): MentionNode {
		const { mentionId, mentionName, mentionType } = serializedNode
		return $createMentionNode(mentionId, mentionName, mentionType)
	}

	constructor(
		mentionId: string,
		mentionName: string,
		mentionType: "user" | "channel",
		key?: NodeKey
	) {
		super(key)
		this.__mentionId = mentionId
		this.__mentionName = mentionName
		this.__mentionType = mentionType
	}

	// Getter methods
	getMentionId(): string {
		return this.__mentionId
	}

	getMentionName(): string {
		return this.__mentionName
	}

	getMentionType(): "user" | "channel" {
		return this.__mentionType
	}

	// Setter methods
	setMentionId(mentionId: string): void {
		const writable = this.getWritable()
		writable.__mentionId = mentionId
	}

	setMentionName(mentionName: string): void {
		const writable = this.getWritable()
		writable.__mentionName = mentionName
	}

	setMentionType(mentionType: "user" | "channel"): void {
		const writable = this.getWritable()
		writable.__mentionType = mentionType
	}

	// Method to update all mention data at once
	setMentionData(
		mentionId: string,
		mentionName: string,
		mentionType: "user" | "channel"
	): void {
		const writable = this.getWritable()
		writable.__mentionId = mentionId
		writable.__mentionName = mentionName
		writable.__mentionType = mentionType
	}

	createDOM(config: EditorConfig): HTMLElement {
		const span = document.createElement("span")
		span.className = "mention-node"
		span.style.display = "inline-block"
		return span
	}

	updateDOM(): false {
		return false
	}

	exportJSON(): SerializedMentionNode {
		return {
			mentionId: this.__mentionId,
			mentionName: this.__mentionName,
			mentionType: this.__mentionType,
			type: "mention",
			version: 1
		}
	}

	getTextContent(): string {
		return `@${this.__mentionName}`
	}

	isInline(): boolean {
		return true
	}

	decorate(editor: LexicalEditor, config: EditorConfig): React.JSX.Element {
		return (
			<MentionComponent
				mentionId={this.__mentionId}
				mentionName={this.__mentionName}
				mentionType={this.__mentionType}
				nodeKey={this.__key}
				editor={editor}
			/>
		)
	}
}

export function $createMentionNode(
	mentionId: string,
	mentionName: string,
	mentionType: "user" | "channel"
): MentionNode {
	return new MentionNode(mentionId, mentionName, mentionType)
}

export function $isMentionNode(
	node: LexicalNode | null | undefined
): node is MentionNode {
	return node instanceof MentionNode
}

// Explicit exports to ensure proper module resolution
export { MentionNode as default }
