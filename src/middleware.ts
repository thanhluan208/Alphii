import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

import { getCookie } from "./app/actions"
import { routing } from "./i18n/routing"
import { ACCESS_TOKEN, Routes } from "./lib/constant"
import { LANGUAGE } from "./types"

const intlMiddleware = createMiddleware(routing)

const outsiders = [
	Routes.login,
	Routes.forgotPassword,
	Routes.resetPassword,
	Routes.otp
]

export default async function middleware(request: NextRequest) {
	const [, locale, ...segments] = request.nextUrl.pathname.split("/")

	const path = `/${segments.join("/")}`

	const isOutsider = outsiders.includes(path)

	const token = await getCookie(ACCESS_TOKEN)

	if (isOutsider && !token) {
		return NextResponse.redirect(
			new URL(`/${locale || LANGUAGE.EN}/login`, request.url)
		)
	}

	if (!isOutsider && token) {
		return NextResponse.redirect(
			new URL(`/${locale || LANGUAGE.EN}/`, request.url)
		)
	}

	const handleI18nRouting = createMiddleware({
		locales: [LANGUAGE.EN, LANGUAGE.TH],
		defaultLocale: LANGUAGE.EN
	})

	const response = handleI18nRouting(request)

	return response
}

export const config = {
	// Match only internationalized pathnames
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
}
