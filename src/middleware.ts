import createMiddleware from "next-intl/middleware"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { removeCookie } from "./app/actions"
import { routing } from "./i18n/routing"
import { USER_ID } from "./lib/constant"

// Define route arrays
const AUTHEN_ROUTES = [
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password"
]
const PRIVATE_ROUTES = ["/studio"]

// Token names
const ACCESS_TOKEN = "access_token"
const REFRESH_TOKEN = "refresh_token"

// Helper function to check if token is expired
function isTokenExpired(token: string): boolean {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]))
		const currentTime = Math.floor(Date.now() / 1000)
		return payload.exp < currentTime
	} catch (error) {
		return true // Consider invalid tokens as expired
	}
}

// Helper function to get cookie value
async function getCookie(name: string): Promise<string | undefined> {
	const cookieStore = cookies()
	return cookieStore.get(name)?.value
}

// Helper function to remove auth cookies
async function removeAuthCookie(response: NextResponse<unknown>) {
	response.cookies.delete(ACCESS_TOKEN)
	response.cookies.delete(REFRESH_TOKEN)
	response.cookies.delete(USER_ID)
}

// Server action placeholder for refreshing tokens
async function refreshTokens(
	refreshToken: string
): Promise<{ accessToken: string; refreshToken: string } | null> {
	try {
		// TODO: Implement actual refresh token logic
		// This should call your backend API to refresh the tokens
		const response = await fetch(
			`${process.env.BASE_URL}/user/generate_access_token_from_refresh_token`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${refreshToken}`
				},
				body: JSON.stringify({ email_or_username: "luandang" })
			}
		)

		if (!response.ok) {
			return null
		}

		const data = await response.json()
		console.log("trying to refresh", data)

		return {
			accessToken: data.accessToken,
			refreshToken: data.refreshToken
		}
	} catch (error) {
		console.error("Error refreshing tokens:", error)
		return null
	}
}

export default async function middleware(request: NextRequest) {
	const [, locale, ...segments] = request.nextUrl.pathname.split("/")
	const path = `/${segments.join("/")}`

	// Get tokens from cookies
	const accessToken = await getCookie(ACCESS_TOKEN)
	const refreshToken = await getCookie(REFRESH_TOKEN)

	// Check if current path is an auth route or private route
	const isAuthRoute = AUTHEN_ROUTES.some((route) => path.startsWith(route))
	const isPrivateRoute = PRIVATE_ROUTES.some((route) => path.startsWith(route))

	// Handle different token states
	if (accessToken && refreshToken) {
		const isAccessExpired = isTokenExpired(accessToken)
		const isRefreshExpired = isTokenExpired(refreshToken)

		if (!isAccessExpired && !isRefreshExpired) {
			// Both tokens are valid
			if (isAuthRoute) {
				// Redirect authenticated users away from auth pages
				return NextResponse.redirect(new URL(`/${locale || "en"}`, request.url))
			}
		} else if (isAccessExpired && !isRefreshExpired) {
			// Access token expired but refresh token is valid
			try {
				const newTokens = await refreshTokens(refreshToken)

				if (newTokens) {
					// Create response with new tokens
					const response = NextResponse.next()

					// Set new tokens in cookies
					response.cookies.set(ACCESS_TOKEN, newTokens.accessToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "lax",
						maxAge: 15 * 60 // 15 minutes for access token
					})

					response.cookies.set(REFRESH_TOKEN, newTokens.refreshToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "lax",
						maxAge: 7 * 24 * 60 * 60 // 7 days for refresh token
					})

					// If trying to access auth routes, redirect to home
					if (isAuthRoute) {
						return NextResponse.redirect(
							new URL(`/${locale || "en"}`, request.url)
						)
					}

					// Continue with the refreshed tokens
					const handleI18nRouting = createMiddleware(routing)
					return handleI18nRouting(request)
				} else {
					console.log("refresh failed clear token...")

					// Refresh failed, treat as no tokens
					if (isPrivateRoute) {
						const response = NextResponse.next()
						removeAuthCookie(response)
						return NextResponse.redirect(
							new URL(`/${locale || "en"}/login`, request.url)
						)
					}

					const handleI18nRouting = createMiddleware(routing)
					const response = handleI18nRouting(request)
					removeAuthCookie(response)
					return response
				}
			} catch (error) {
				const response = NextResponse.next()
				removeAuthCookie(response)
				// On refresh error, treat as no tokens
				if (isPrivateRoute) {
					return NextResponse.redirect(
						new URL(`/${locale || "en"}/login`, request.url)
					)
				}
			}
		} else {
			// Both tokens are expired or invalid
			// Clear the expired cookies
			const response = NextResponse.next()
			removeAuthCookie(response)
			if (isPrivateRoute) {
				return NextResponse.redirect(
					new URL(`/${locale || "en"}/login`, request.url)
				)
			}
		}
	} else {
		// No tokens present
		if (isPrivateRoute) {
			return NextResponse.redirect(
				new URL(`/${locale || "en"}/login`, request.url)
			)
		}
	}

	// Handle i18n routing
	const handleI18nRouting = createMiddleware(routing)
	const response = handleI18nRouting(request)

	return response
}

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
}
