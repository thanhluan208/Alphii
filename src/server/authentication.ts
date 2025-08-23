"use server"

import { cookies } from "next/headers"

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "@/lib/constant"
import { decodeJwtPayload } from "@/lib/utils"
import { CommonResponse, DefaultResponse } from "@/types"
import {
	LoginPayload,
	LoginResponse,
	UserDataLogin
} from "@/types/authentication.type"
import { Profile } from "@/types/user.type"

import { apiUtils } from "./helper"

// Cookie configuration
const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "strict" as const,
	path: "/"
}

export const baseLoginAction = apiUtils.createServerAction<
	LoginPayload,
	LoginResponse
>("/user/information/log_in")

export const loginAction = async (
	payload: LoginPayload
): Promise<CommonResponse<UserDataLogin>> => {
	try {
		// Call the API
		const response = await baseLoginAction(payload)
		console.log("Login response:", response)

		// Check if login failed
		if (response.error || !response.data) {
			return {
				code: 500,
				message: ""
			}
		}

		const { access_token, refresh_token, ...userData } = response.data

		// Validate that we received the required tokens
		if (!access_token || !refresh_token) {
			return {
				code: 500,
				message: ""
			}
		}

		// Set cookies
		const cookieStore = cookies()

		const accessTokenDecoded = decodeJwtPayload(refresh_token)

		// Set access token (shorter expiry)
		cookieStore.set(ACCESS_TOKEN, access_token, {
			...COOKIE_OPTIONS,
			maxAge: Number(accessTokenDecoded?.exp) || 15 * 60
		})

		// Set refresh token (longer expiry)
		cookieStore.set(REFRESH_TOKEN, refresh_token, {
			...COOKIE_OPTIONS,
			maxAge: Number(accessTokenDecoded?.exp) || 7 * 24 * 60 * 60
		})

		cookieStore.set(USER_ID, userData.user_data.user_id)

		// Return success response (without tokens for security)
		return {
			data: userData.user_data,
			message: "Login successful",
			code: response.data.status_code
		}
	} catch (error) {
		console.error("Login action error:", error)
		return {
			message:
				error instanceof Error ? error.message : "An unexpected error occurred",
			code: 500
		}
	}
}

export const getUserData = apiUtils.createServerAction<
	{ user_id: string },
	{ user_data: Profile }
>("/user/information/show_user_data", "POST")
