export interface Profile {
	id: string
	firstName: string
	lastName: string
	email: string
	role: Role[]
}

export enum Role {
	CUSTOMER = "CUSTOMER",
	ADMIN = "ADMIN"
}
