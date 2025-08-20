import Image from "next/image"

const Thinking = () => {
	return (
		<div className="w-full flex-1 relative overflow-hidden">
			<Image
				src="/images/studio/preview-placeholder.png"
				alt="thinking"
				fill
				sizes="100%"
				className="absolute top-0 left-0"
			/>
		</div>
	)
}

export default Thinking
