import React, { Fragment, useEffect, useState } from "react"

interface DeepthinkContentProps {
	content: string
	currentAnimation: number
	setNextAnimation: () => void
	hasDivider?: boolean
	index: number
}

const DeepthinkContent = ({
	content,
	index,
	currentAnimation,
	setNextAnimation,
	hasDivider
}: DeepthinkContentProps) => {
	const [displayedText, setDisplayedText] = useState("")
	const [currentIndex, setCurrentIndex] = useState(0)

	const shouldAnimation = currentAnimation === index
	const skipAnimation = currentAnimation > index

	useEffect(() => {
		if (!shouldAnimation) return
		if (currentIndex < content.length) {
			const timer = setTimeout(() => {
				// Generate random number between 3-5
				const charsToAdd = Math.floor(Math.random() * 3) + 3

				// Calculate how many characters we can actually add
				const remainingChars = content.length - currentIndex
				const actualCharsToAdd = Math.min(charsToAdd, remainingChars)

				// Add the characters
				const newText = content.slice(0, currentIndex + actualCharsToAdd)
				setDisplayedText(newText)
				setCurrentIndex(currentIndex + actualCharsToAdd)
			}, 25)

			return () => clearTimeout(timer)
		}
	}, [currentIndex, content, shouldAnimation])

	useEffect(() => {
		if (displayedText === content && shouldAnimation) {
			setNextAnimation()
		}
	}, [content, displayedText, setNextAnimation, shouldAnimation])

	useEffect(() => {
		if (skipAnimation) setDisplayedText(content)
	}, [skipAnimation, content])

	return (
		<Fragment>
			<p className="whitespace-pre-line break-words italic text-alphii_text_sub_600 text-xs">
				{displayedText}
			</p>
			{hasDivider && !shouldAnimation && displayedText === content && (
				<div className="w-full border border-alphii_border border-dashed my-2" />
			)}
		</Fragment>
	)
}

export default DeepthinkContent
