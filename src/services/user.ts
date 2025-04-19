import { api } from "@/helpers"

export const userManagementAPI = {
	create: async (user: object) => {
		return await api.post(`/user/create`, user)
	},
	register: async (user: object) => {
		return await api.post(`/user/register`, user)
	}
}
