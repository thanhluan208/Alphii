import { Role } from "./profile.type"

export interface UserData {
	id: string
	email: string
	firstName: string
	lastName: string
	role: UserRole
	status: UserStatus
	createdAt?: Date
	updatedAt?: Date
	dob: Date
	nationality: string
	jobTitle: string
	phoneNumber: string
	passportNumber: string
	passportExpiryDate: Date
	IssuingCountry: string
	address: string
	city: string
	country: string
	postalCode: string
	roleAssigned: string
	password?: string
}

export enum UserRole {
	CUSTOMER = "CUSTOMER",
	ADMIN = "ADMIN",
	STAFF = "STAFF",
	PARTNER = "PARTNER",
	GUEST = "GUEST"
}

export enum UserStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	BLACKLISTED = "BLACKLISTED"
}

export enum UserType {
	ADMINUSER = "ADMINUSER",
	PARTNERADMIN = "PARTNERADMIN"
}

export interface PassengerData {
	passengerId: string
	passengerName: string
	email: string
	phoneNumber: string
	loyalty: string
	payment: string
	address: string
	country: string
	city: string
	postalCode: string
	password: string
	status: PassengerStatus
}

export enum PassengerStatus {
	ACTIVED = "ACTIVE",
	INACTIVE = "INACTIVE"
}
