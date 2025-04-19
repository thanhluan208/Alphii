import { CategoryTypeEnum } from "."

export interface PartnerService {
	id: string
	status: string
	partnerId: string
	categoryId: string
	name: string
	description: string
	serviceMedia: ServiceMedia[]
	mainFacilities: string[]
	tag: string[]
	nearbyPlace: string[]
	houseRule: string
	serviceType: string
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

export interface ServiceMedia {
	mediaId: string
	mediaUrl: string
	mediaType: string
}

export interface CreateServicePayload {
	id?: string
	serviceType: CategoryTypeEnum
	partnerId: string
	categoryId: string
	name: string
	description?: string
	serviceMedia: ServiceMedia[]
	status?: string
	mainFacilities?: string[]
	tag?: string[]
	nearbyPlace?: string[]
	houseRule?: string
	specialization?: string
}

export interface ServiceMedia {
	mediaId: string
	mediaUrl: string
	mediaType: string
}

export interface PartnerSubService {
	id: string
	serviceId: string
	name: string
	description: string
	basePrice: number
	capacity: number
	subServiceAddOn: SubServiceAddOn[]
	status: string
	createdAt: CreatedAt
	isDeleted: boolean
}

export interface CreatedAt {
	_seconds: number
	_nanoseconds: number
}

export interface SubServiceAddOn {
	name: string
	description: string
	price: number
}

export interface SubServicePayload {
	id?: string
	serviceId: string
	name: string
	description: string
	capacity: number
	includedAmenities: string[]
	notIncludedAmenities: string[]
	subServiceAddOn: SubServiceAddOn[]
	status: string
}

export interface SubServiceAddOn {
	name: string
	description: string
}
