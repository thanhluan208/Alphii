export interface RoleData {
	roleId: string
	roleName: string
	description: string
	status: RoleStatus
	createdAt?: Date
	updatedAt?: Date
}
export enum RoleStatus {
	ACTIVATED = "ACTIVATED",
	DEACTIVATED = "DEACTIVATED"
}
