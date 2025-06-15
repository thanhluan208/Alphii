import { api } from "@/helpers"
class authServices {
	async refreshToken() {
		return api.get("/auth/refresh").then((res) => res.data)
	}
}

const AuthServices = new authServices()
export default AuthServices
