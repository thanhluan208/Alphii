import type { Metadata } from "next"
import { Instrument_Sans, Josefin_Sans } from "next/font/google"

import { Providers } from "@/providers"

import { siteConfig } from "@/config/site"

import "./globals.css"

import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

import { routing } from "@/i18n/routing"
import { twJoin } from "tailwind-merge"

const josefin = Josefin_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "600", "700"],
	variable: "--font-josefin"
})

const instrument = Instrument_Sans({
	subsets: ["latin"],
	weight: ["400", "600", "700", "500"],
	variable: "--font-intrument"
})

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description
}

export default async function RootLayout({
	children,
	params: { locale }
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body className={twJoin(josefin.variable, instrument.variable)}>
				<NextIntlClientProvider messages={messages}>
					<Providers>
						<main className="flex flex-col font-sans">{children}</main>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
