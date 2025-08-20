export const languages = ["en", "th"]

export const ACCESS_TOKEN = "access_token"
export const REFRESH_TOKEN = "refresh_token"
export const USER_ID = "user_id"
export const BASE_URL = process.env.BASE_URL || "http://backend-default"
export const WS_URL = process.env.WS_URL || ""
export const NEXT_LOCALE = "NEXT_LOCALE"
export const DEFAULT_INIT_PAGE = "1"

export const Routes = {
	ROOT: "/",
	SHOWCASE: "/showcases",
	PROJECT: "/project",
	STUDIO: "/studio",
	LOGIN: "/login",
	REGISTER: "/register",
	FORGOT_PASSWORD: "/forgot-password",
	RESET_PASSWORD: "/reset-password",
	GOOGLE_LOGIN: BASE_URL + "/auth/google",
	GITHUB_LOGIN: BASE_URL + "/auth/github",
	SOCIAL_LOGIN_ORIGIN: "http://localhost:8000"
}

export const QueryKeys = {
	VALIDATE_RESET: "VALIDATE_RESET",

	//! USER
	USER_DATA: "USER_DATA",

	//! MAT
	MAT_MAIN_PRD: "MAT_MAIN_PRD",
	ALL_MAT_PRD: "ALL_MAT_PRD",
	MAT_DOMAIN_SESSION_INFO: "MAT_DOMAIN_SESSION_INFO",
}

export const TIME_IN_SECONDS = {
	ONE_MINUTE: 60,
	ONE_HOUR: 60 * 60,
	ONE_DAY: 60 * 60 * 24
}

export const COUNT_DOWN_OTP = 60 //In seconds

//! USER API
export const logout = "/user/log_out"
export const refreshToken = "/user/generate_access_token_from_refresh_token"
export const signInApi = "/user/information/log_in"
export const getUserData = "/user/information/show_user_data"
export const signUpApi = "/user/registration/sign_up"
export const verifyEmail = "/user/resend_verification_code"
export const submitOTP = "/user/registration/verify_verification_code"
export const changePasswordApi = "/user/change_password_user"
export const searchUser = "/user/search_user"
export const updateUser = "/user/update_user"
export const voteStarAgent = "/user/vote_star_agent"
export const forgotPass = "/user/forget_password"
export const changePassword = "/user/change_password_with_reset_code"
export const getAvatar = "/user/get_avatar"
export const uploadAvatar = "/user/upload_avatar"

export const LOCAL_STORAGE_KEY = {
	ACCESS_TOKEN: "ACCESS_TOKEN",
	REFRESH_TOKEN: "REFRESH_TOKEN",
	USER_ID: "USER_ID",
	USER_DATA: "USER_DATA"
}
