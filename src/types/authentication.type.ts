export interface LoginPayload {
	email_or_username: string
	password: string
}

export interface LoginResponse {
	status_code: number
	message: string
	user_data: UserDataLogin
	access_token: string
	refresh_token: string
}

export interface UserDataLogin {
	user_id: string
	user_name: string
	email: string
	email_verified: string
	active: string
}

export interface SignupPayload {
	user_name: string
	email: string
	password: string
	display_name: string
}

export interface AuthLoginSuccessParams {
	redirectTo: string
	params: Record<string, string>
}
