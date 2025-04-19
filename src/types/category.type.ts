import { CategoryTypeEnum } from "."

export interface CategoryData {
	id: string
	name: string
	categoryType: CategoryTypeEnum
	status: string
	createdAt: CreatedAt
	isDeleted: boolean
	createdBy: CreatedBy
}

export interface CreatedAt {
	_seconds: number
	_nanoseconds: number
}

export interface CreatedBy {
	id: string
	email: string
}
