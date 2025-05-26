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

function MentionComponent({
	mentionId,
	mentionName,
	mentionType
}: {
	mentionId: string
	mentionName: string
	mentionType: "user" | "channel"
}) {
	const bgColor =
		mentionType === "user"
			? "bg-blue-100 text-blue-800 border-blue-200"
			: "bg-green-100 text-green-800 border-green-200"

	const Icon = mentionType === "user" ? User : Hash

	return (
		<span
			className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${bgColor}`}
			contentEditable={false}
			suppressContentEditableWarning={true}
		>
			<Icon className="w-3 h-3" />
			{mentionName}
		</span>
	)
}

export class MentionNode extends DecoratorNode<JSX.Element> {
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

	decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
		return (
			<MentionComponent
				mentionId={this.__mentionId}
				mentionName={this.__mentionName}
				mentionType={this.__mentionType}
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
