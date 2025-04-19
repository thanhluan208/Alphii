import { api } from "@/helpers"
import { DefaultResponse } from "@/types"
import { Profile } from "@/types/profile.type"

class authServices {
	async login(body: { username: string; password: string }): Promise<
		DefaultResponse<{
			access_token: string
			user: Profile
		}>
	> {
		return api.post("/auth/login", body).then((res) => res.data)
	}
	async refreshToken(): Promise<
		DefaultResponse<{
			access_token: string
			user: Profile
		}>
	> {
		return api.get("/auth/refresh").then((res) => res.data)
	}

	async forgotPassword(username: string): Promise<DefaultResponse<string>> {
		return api
			.post(`/auth/forgot?username=${username}`, {})
			.then((res) => res.data)
	}

	async validateReset(
		user: string,
		otp: string
	): Promise<DefaultResponse<string>> {
		return api
			.get(`/auth/validate-reset?username=${user}&otp=${otp}`)
			.then((res) => res.data)
	}

	async resetPassword(body: {
		username: string
		password: string
		confirmPassword: string
	}): Promise<DefaultResponse<string>> {
		return api.post(`/auth/reset`, body).then((res) => res.data)
	}
}

const AuthServices = new authServices()
export default AuthServices
