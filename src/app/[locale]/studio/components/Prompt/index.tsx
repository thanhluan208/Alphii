import React from "react"

import ChatContent from "@/app/[locale]/showcases/components/ChatContent"
import ChatInput from "@/app/[locale]/showcases/components/ChatInput"

const Prompt = () => {
	return (
		<div className="lg:w-[550px] w-[300px] flex flex-col h-full border-l border-alphii_border_2 bg-card">
			<ChatContent />
			<ChatInput />
		</div>
	)
}

export default Prompt
