export enum MATMessageType {
	RECEIVE_INFO = "receive_info",
	NEW_MESSAGE = "new_message",
	END_SESSION = "end_session",
	RECEIVE_STATUS = "receive_status",
	STATUS = "status"
}

export interface MATNewMessage {
	type: string
	data: Data
}

export interface Data {
	messages: Messages
	round: number
	status?: string

}

export interface Messages {
	team: any[]
	roles: Roles
}

export interface Roles {
	[key: string]: Agent[]
}

export interface Agent {
	id: string
	content: string
	instruct_content: null
	role: string
	cause_by: string
	sent_from: string
	send_to: string[]
	metadata: Metadata
}

export interface Metadata {}
