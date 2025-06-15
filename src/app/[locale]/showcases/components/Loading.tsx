import React from "react"

import { SpinIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

import useFileStore from "@/stores/fileStore"



const Loading = () => {
	const { loading } = useFileStore()

	if (!loading.isLoading) return null

	return (
		<div className={cn("flex w-full justify-start")}>
			<div className="flex flex-col bg-card border rounded-xl w-fit max-w-[70%] rounded-br-md gap-1 p-3 border-alphii_border_2 ">
				{loading.name && <div className="flex items-center gap-2">
					<div className="w-6 h-6 rounded-full bg-[url('/images/agents/bob-avatar.png')] bg-cover bg-center" />
					<p className="text-sm font-medium">{loading.name}</p>
				</div>}

				<div className="flex  gap-1">
					<SpinIcon />
					<p className="font-medium font-sm whitespace-pre-wrap">Thinking...</p>
				</div>
			</div>
		</div>
	)
}

export default Loading
