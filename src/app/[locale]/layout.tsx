import type { Metadata } from "next"
import { Instrument_Sans, Inter, Josefin_Sans } from "next/font/google"

import { Providers } from "@/providers"

import { siteConfig } from "@/config/site"

import "./globals.css"

import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

import { Toaster } from "@/components/ui/toaster"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/providers/themeProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { twJoin } from "tailwind-merge"

import { StructuredData } from "./_components/StructuredData"

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-inter"
})

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
	creator: siteConfig.author.name,
	publisher: siteConfig.author.name,

	// Add more meta tags
	alternates: {
		canonical: siteConfig.canonicalUrl
	},

	openGraph: siteConfig.openGraph,
	twitter: siteConfig.twitter,

	robots: siteConfig.robots,

	// Add verification tags
	verification: {
		google: "k_EFblwkx2V1p89OYGdeGkW-obsgOVgo_705QYB1pRE",
		yandex: "your-yandex-verification-code",
		yahoo: "your-yahoo-verification-code"
	},

	// Add app-specific meta
	applicationName: siteConfig.title,
	referrer: "origin-when-cross-origin",
	category: "technology",

	// Add manifest
	manifest: "/manifest.json",

	// Add icons
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "16x16", type: "image/png" },
			{ url: "/favicon.ico", sizes: "32x32", type: "image/png" }
		],
		apple: [{ url: "/favicon.ico", sizes: "180x180", type: "image/png" }],
		other: [{ rel: "mask-icon", url: "/favicon.ico", color: "#5bbad5" }]
	}
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
			<head>
				<StructuredData />
			</head>
			<body className={twJoin(inter.variable)}>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<Providers>
							<SpeedInsights />
							<main>{children}</main>
						</Providers>
					</ThemeProvider>
				</NextIntlClientProvider>
				<Toaster />
			</body>
		</html>
	)
}
