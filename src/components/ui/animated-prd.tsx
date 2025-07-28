"use client"

import { ComponentPropsWithoutRef, useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"

import { PrdFileContent } from "@/types/mat.type"
import dayjs from "dayjs"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "./button"
import { cn } from "@/lib/utils"

interface AnimatedPRDProps extends ComponentPropsWithoutRef<"div"> {
	prds: PrdFileContent[]
	autoplay?: boolean
	onSelectPrd?: (value: PrdFileContent) => void
}

export const AnimatedPRD = ({
	prds,
	autoplay = false,
	className,
	onSelectPrd
}: AnimatedPRDProps) => {
	const [active, setActive] = useState(0)

	// Generate stable random rotations for each PRD
	const rotations = useMemo(() => {
		return prds.map((prd, index) => {
			// Use a combination of index and prd_id for consistent randomness
			const seed =
				index +
				(prd.prd_id
					? prd.prd_id.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
					: 0)
			// Create a more natural distribution with 14deg range
			const baseRotation = (seed % 18) - 9 // Range: -9 to 9
			const variation = (seed % 14) - 7 // Range: -7 to 7
			return Math.max(-16, Math.min(16, baseRotation + variation)) // Clamp to -16 to 16
		})
	}, [prds])

	// Generate hover rotations for non-active cards
	const hoverRotations = useMemo(() => {
		return prds.map((prd, index) => {
			const seed =
				index +
				(prd.prd_id
					? prd.prd_id.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
					: 0) +
				100
			const rotation = (seed % 14) - 7 // Range: -7 to 7 for hover variation
			return rotation
		})
	}, [prds])

	const handleNext = () => {
		setActive((prev) => (prev + 1) % prds.length)
	}

	const handlePrev = () => {
		setActive((prev) => (prev - 1 + prds.length) % prds.length)
	}

	const isActive = (index: number) => {
		return index === active
	}

	useEffect(() => {
		if (autoplay) {
			const interval = setInterval(handleNext, 5000)
			return () => clearInterval(interval)
		}
	}, [autoplay])

	return (
		<div className={cn("mx-auto px-4 py-14", className)}>
			<div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
				<div>
					<div className="relative h-80 w-full">
						<AnimatePresence>
							{prds.map((prd, index) => (
								<motion.div
									key={prd.prd_id}
									initial={{
										opacity: 0,
										scale: 0.9,
										z: -100,
										rotate: rotations[index]
									}}
									animate={{
										opacity: isActive(index) ? 1 : 0.7,
										scale: isActive(index) ? 1 : 0.95,
										z: isActive(index) ? 0 : -100,
										rotate: isActive(index)
											? 0
											: rotations[index],
										zIndex: isActive(index) ? 40 : prds.length + 2 - index,
										y: isActive(index) ? [0, -80, 0] : 0
									}}
									exit={{
										opacity: 0,
										scale: 0.9,
										z: 100,
										rotate: rotations[index] + 5 // Slight variation on exit
									}}
									whileHover={{
										rotate: isActive(index)
											? 0
											: rotations[index] + hoverRotations[index] * 0.5,
										scale: isActive(index) ? 1.02 : 0.97,
										transition: { duration: 0.2 }
									}}
									transition={{
										duration: 0.4,
										ease: "easeInOut"
									}}
									className="absolute inset-0 origin-bottom"
								>
									<div
										onClick={() => {
											onSelectPrd?.(prd)
										}}
										className={cn(
											"bg-alphii_background_2 border dark:border-0 border-alphii_border rounded-3xl p-4 cursor-pointer hover:shadow-md transition-shadow h-[500px] overflow-y-auto no-scrollbar",
											!isActive(index) && "h-[520px] blur-sm"
										)}
									>
										<ReactMarkdown>{prd.content}</ReactMarkdown>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
				<div className="flex flex-col justify-between py-4">
					<motion.div
						key={active}
						initial={{
							y: 20,
							opacity: 0
						}}
						animate={{
							y: 0,
							opacity: 1
						}}
						exit={{
							y: -20,
							opacity: 0
						}}
						transition={{
							duration: 0.2,
							ease: "easeInOut"
						}}
					>
						<h3 className="text-2xl font-bold text-black dark:text-white">
							{prds[active].name}
						</h3>
						<p className="text-sm text-gray-500 dark:text-neutral-500">
							Created at:{" "}
							{dayjs(prds[active].created_at).format("DD/MM/YYYY HH:mm:ss")}
						</p>
						<motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
							{prds[active].template_reasoning.split(" ").map((word, index) => (
								<motion.span
									key={index}
									initial={{
										filter: "blur(10px)",
										opacity: 0,
										y: 5
									}}
									animate={{
										filter: "blur(0px)",
										opacity: 1,
										y: 0
									}}
									transition={{
										duration: 0.2,
										ease: "easeInOut",
										delay: 0.02 * index
									}}
									className="inline-block"
								>
									{word}&nbsp;
								</motion.span>
							))}
						</motion.p>
					</motion.div>

					<div className="w-full flex justify-end">
						<Button
							onClick={() => {
								const currentPrd = prds[active]
								if (currentPrd && onSelectPrd) {
									onSelectPrd(currentPrd)
								}
							}}
						>
							Select PRD
						</Button>
					</div>
					<div className="flex gap-4 pt-12 md:pt-0">
						<button
							onClick={handlePrev}
							className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
						>
							<ArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
						</button>
						<button
							onClick={handleNext}
							className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
						>
							<ArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
