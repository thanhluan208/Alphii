"use client"

import React, { useCallback, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export const InfiniteMovingCards = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
	className
}: {
	items: React.ReactNode[]
	direction?: "left" | "right"
	speed?: "fast" | "normal" | "slow"
	pauseOnHover?: boolean
	className?: string
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null)
	const scrollerRef = React.useRef<HTMLUListElement>(null)

	const [start, setStart] = useState(false)

	const getDirection = useCallback(() => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"forwards"
				)
			} else {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"reverse"
				)
			}
		}
	}, [direction])
	const getSpeed = useCallback(() => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty("--animation-duration", "20s")
			} else if (speed === "normal") {
				containerRef.current.style.setProperty("--animation-duration", "40s")
			} else {
				containerRef.current.style.setProperty("--animation-duration", "80s")
			}
		}
	}, [speed])
	const addAnimation = useCallback(() => {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children)

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true)
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem)
				}
			})

			getDirection()
			getSpeed()
			setStart(true)
		}
	}, [getDirection, getSpeed])

	useEffect(() => {
		addAnimation()
	}, [addAnimation])

	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					"flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
					start && "animate-scroll",
					pauseOnHover && "hover:[animation-play-state:paused]"
				)}
			>
				{items.map((item, idx) => (
					<li className="relative shrink-0 " key={idx}>
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}
