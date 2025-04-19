export const languages = ["en", "th"]

export const ACCESS_TOKEN = "access_token"
export const REFRESH_TOKEN = "refresh_token"
export const BASE_URL = "/app-service"
export const NEXT_LOCALE = "NEXT_LOCALE"
export const DEFAULT_INIT_PAGE = "1"

export const Routes = {
	login: "/login",
	dashboard: "/dashboard",
	booking: "/booking-management",
	report: "/report",
	company: "/company-management",
	user: "/user-management",
	newUser: "/new-user",
	service: "/service-management",
	newService: "/new-service",
	booking_details: "/booking-details",
	forgotPassword: "/forgot-password",
	resetPassword: "/reset-password",
	otp: "/otp",
	passengerManagement: "/passenger-management",
	rolePermission: "/role-permission",
	newRole: "/new-role"
}

export const QueryKeys = {
	VALIDATE_RESET: "VALIDATE_RESET",

	PARTNER_SERVICE_ALL: "PARTNER_SERVICE_ALL",
	PARTNER_SERVICE_DETAIL: "PARTNER_SERVICE_DETAIL",
	PARTNER_SUB_SERVICE_DETAIL: "PARTNER_SUB_SERVICE_DETAIL",
	PARTNER_CATEGORY_ALL: "PARTNER_CATEGORY_ALL",
	PARTNER_PERMISSION_ALL: "PARTNER_PERMISSION_ALL",
	PARTNER_CATEGORY_INFINITE: "PARTNER_CATEGORY_INFINITE"
}

export const TIME_IN_SECONDS = {
	ONE_MINUTE: 60,
	ONE_HOUR: 60 * 60,
	ONE_DAY: 60 * 60 * 24
}

export const COUNT_DOWN_OTP = 60 //In seconds
