"use client"

import React from "react"

import { Link as NextIntlLink } from "@/i18n/routing"

import { useSmoothScroll } from "@/hooks/useSmoothScroll"

interface SmoothLinkProps extends React.ComponentProps<typeof NextIntlLink> {
	scrollOffset?: number
	scrollDuration?: number
	scrollEasing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear"
	delay?: number
}

export const SmoothLink: React.FC<SmoothLinkProps> = ({
	scrollOffset = 80, // Default offset for header height
	scrollDuration = 800,
	scrollEasing = "ease-in-out",
	children,
	onClick,
	delay,
	...props
}) => {
	const { scrollToSection } = useSmoothScroll({
		offset: scrollOffset,
		duration: scrollDuration,
		easing: scrollEasing
	})

	const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		// Call the original onClick if provided
		if (onClick) {
			onClick(e)
			e.preventDefault()
		}

		// If it's a hash link (starts with #), handle smooth scrolling
		if (delay) {
			await new Promise((res) =>
				setTimeout(() => {
					res("")
				}, delay)
			)
		}

		if (
			props.href &&
			typeof props.href === "string" &&
			props.href.startsWith("#")
		) {
			const sectionId = props.href.substring(1) // Remove the # from the href
			scrollToSection(sectionId)
		}
	}

	return (
		<NextIntlLink onClick={handleClick} {...props}>
			{children}
		</NextIntlLink>
	)
}
