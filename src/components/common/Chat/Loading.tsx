import React, { useMemo } from "react"

import { SpinIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ChatType } from "@/types"

import useChatStore from "@/stores/fileStore"

import { Deepthink } from "./DeepThinking"

const Loading = () => {
	const { loading, messages } = useChatStore()

	const isDeepthinking = useMemo(() => {
		const lastMsg = messages?.[messages?.length - 1] as Deepthink
		if (lastMsg?.isPending) return true

		return false
	}, [messages])

	if (!loading.isLoading || isDeepthinking) return null

	return (
		<div className={cn("flex w-full justify-start")}>
			<div className="flex flex-col bg-card dark:bg-alphii_background_2 dark:border-none border rounded-xl w-fit max-w-[70%] rounded-br-md gap-1 p-3 border-alphii_border_2 ">
				{loading.name && (
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 rounded-full bg-[url('/images/agents/bob-avatar.png')] bg-cover bg-center" />
						<p className="text-sm font-medium">{loading.name}</p>
					</div>
				)}

				<div className="flex items-center gap-3">
					<SpinIcon className="w-4 h-4"/>
					<p className="font-medium font-sm whitespace-pre-wrap">Thinking...</p>
				</div>
			</div>
		</div>
	)
}

export default Loading
