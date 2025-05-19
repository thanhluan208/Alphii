'use client'

import React from "react"

import { Skeleton } from "@/components/ui"
import { Dot } from "lucide-react"

const Case = () => {
	return (
		<div>
			<Skeleton className="w-full h-[170px]" />
			<div className="py-2.5 flex flex-col gap-0.5">
				<p className="font-[500]">Untitled Project</p>
				<div className="flex  items-center text-sm text-alphii_text_sub_600">
					<p>Landing Page</p>
					<Dot className="w-4"/>
					<p>Edited 5s ago</p>
				</div>
			</div>
		</div>
	)
}

export default Case
