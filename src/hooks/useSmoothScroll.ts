"use client"

import { useCallback } from "react"

interface SmoothScrollOptions {
	offset?: number
	duration?: number
	easing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear"
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
	const { offset = 0, duration = 800, easing = "ease-in-out" } = options

	const scrollToSection = useCallback(
		(sectionId: string) => {
			const element = document.getElementById(sectionId)
			if (!element) {
				console.warn(`Element with id "${sectionId}" not found`)
				return
			}

			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY
			const offsetPosition = elementPosition - offset

			// Use native smooth scrolling if supported
			if ("scrollBehavior" in document.documentElement.style) {
				console.log("scrool to", offsetPosition)
				document.getElementById("home")?.scrollTo({
					top: offsetPosition,
					behavior: "smooth"
				})
				return
			}

			// Fallback for browsers that don't support smooth scrolling
			const startPosition = window.scrollY
			const distance = offsetPosition - startPosition
			let startTime: number | null = null

			const animation = (currentTime: number) => {
				if (startTime === null) startTime = currentTime
				const timeElapsed = currentTime - startTime
				const progress = Math.min(timeElapsed / duration, 1)

				// Easing function
				let easeProgress = progress
				switch (easing) {
					case "ease-in":
						easeProgress = progress * progress
						break
					case "ease-out":
						easeProgress = 1 - (1 - progress) * (1 - progress)
						break
					case "ease-in-out":
						easeProgress =
							progress < 0.5
								? 2 * progress * progress
								: 1 - Math.pow(-2 * progress + 2, 2) / 2
						break
					case "linear":
					default:
						easeProgress = progress
				}

				window.scrollTo(0, startPosition + distance * easeProgress)

				if (timeElapsed < duration) {
					requestAnimationFrame(animation)
				}
			}

			requestAnimationFrame(animation)
		},
		[offset, duration, easing]
	)

	return { scrollToSection }
}
