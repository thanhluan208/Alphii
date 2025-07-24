export enum LANGUAGE {
	EN = "en",
	TH = "th"
}

export interface DefaultResponse<T = unknown> {
	message: string
	status_code: STATUS_CODE
	data?: T
}

export enum STATUS_CODE {
	SUCCESS = 200,
	CREATED = 201,
	UNAUTHORIZED = 401,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
	FAIL = 400
}

export interface PagingMeta {
	current: number
	pageSize: number
	total: number
	pages: number
}

export interface RoutesInterface {
	path: string
	label: string
	icon?: React.ReactNode
	childrens?: RoutesInterface[]
	hideOnNav?: boolean
}

export enum StatusEnum {
	ACTIVE = "ACTIVE",
	DEACTIVE = "INACTIVE"
}

export interface CommonOption {
	label: string
	value: string
	icon?: React.ReactNode
}

export interface Media {
	mediaId: string
	mediaUrl: string
	mediaType: string
}

export enum ChatType {
	NORMAL = "normal",
	DEEPTHINK = "deepthink"
}

export interface CommonResponse<T> {
	message?: string
	code: number
	data?: T
}
