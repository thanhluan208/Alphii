export interface Profile {
	activate: string
	credits: number
	current_plan: string
	user_name: string
	display_name: string
	email: string
	favorites: Favorites
	last_login: number
	next_plan: string
	phone_num: string
	stars: Favorites
	time_end: number
	time_start: number
	usage_information: UsageInformation
	user_id: string
	avatar_url: string
	background_url: string
}

export interface Favorites {
	agents: string[]
	workflows: string[]
}

export interface UsageInformation {
	in_month: { [key: string]: Usage }
	in_day: { [key: string]: Usage }
	in_minute: { [key: string]: Usage }
}

export interface Usage {
	credits_used: number
	requests_used: number
	tokens_used: number
}

export enum PersonalTabs {
	Bot = "bot",
	Workflow = "workflow",
	Knowledge = "knowledge"
}

export interface UserData {
	activate: string
	credits: number
	current_plan: string
	display_name: string
	email: string
	last_login: number
	next_plan: string
	phone_num: string
	time_end: number
	time_start: number
	usage_information: UsageInformation
	user_id: string
	avatar_url: string
}

export type UpdateUserPayload = {
	user_id: string
	edit_user_data: {
		display_name: string
		phone_num?: string
		email: string
	}
}
export type UpdateAvatarPayload = {
	user_id: string
	file_input: File
}

export interface ChatHistory {
	id: number
	createdAt: Date
	lastUpdate: Date
	title: string
}
