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
	messages: Team[]
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

export interface CreateMultiAgentTeamRequest {
	user_id: string // e.g., "6411973e-d6c7-4536-a8db-2279df4810b5"
	mat_name: string // e.g., "test team dev enhance gen2 3"
	mat_description: string // e.g., ""
	categories: string[] // e.g., ["physics", "funny"]
	team_template: string // e.g., "dev_team_enhance_gen2"
}

export interface GenerateMatPrdsPayload {
	mat_id: string
	session_id: string
	user_prompt: string
}

export interface SelectMainPrd {
	mat_id: string
	session_id: string
	prd_id: string
}

export interface GetAllMatPrdPayload {
	mat_id: string
	session_id: string
}

export interface PrdFileContent {
	prd_id: string
	user_prompt: string
	content: string
	template_recommendation: string
	template_reasoning: string
	created_at: Date
	name: string
}

export interface PrdFiles {
	[key: string]: PrdFileContent
}