import React from "react"

import ChatContent from "@/components/common/Chat/ChatContent"
import ChatInput from "@/components/common/Chat/ChatInput"

const Prompt = () => {
	return (
		<div className="lg:w-[550px] w-[300px] flex flex-col h-full border-l border-alphii_border_2 bg-card">
			<ChatContent />
			<ChatInput />
		</div>
	)
}

export default Prompt
