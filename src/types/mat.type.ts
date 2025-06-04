import { TreeNode } from "@/components/common/FolderTree/FolderTreeNodes"

export enum MATMessageType {
	RECEIVE_INFO = "receive_info",
	NEW_MESSAGE = "new_message",
	END_SESSION = "end_session",
	RECEIVE_STATUS = "receive_status",
	STATUS = "status",
	VISUALIZE = "visualize",
	IDLE = "idle"
}

export interface MATNewMessage {
	type: string
	data: Data
}
export interface Data {
	messages: Messages
	files: TreeNode[]
	round: number
}

export interface Messages {
	team: Team[]
	roles: Roles
}

export interface Roles {
	[key: string]: Agent
}

export interface Agent {
	thinking: boolean
}

export interface Team {
	id: string
	content: string
	instruct_content: null
	role: string
	cause_by: string
	sent_from: string
	send_to: string[]
}
