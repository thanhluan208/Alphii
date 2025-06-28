"use client"

import React from "react"

import { Button } from "@/components/ui"
import { ChevronLeft, Ellipsis, History } from "lucide-react"

import useChatStore from "@/stores/fileStore"

const Header = () => {
	const { messages } = useChatStore()

	return (
		<div className="w-full py-4 flex items-center justify-between">
			<Button variant="ghost" className="w-fit p-0">
				<ChevronLeft />
				Back
			</Button>
			<div className="flex gap-2">
				<Button variant="ghost" className="w-6 h-6 p-0">
					<Ellipsis />
				</Button>
				<Button variant="ghost" className="w-6 h-6 p-0">
					<History />
				</Button>
			</div>
		</div>
	)
}

export default Header
