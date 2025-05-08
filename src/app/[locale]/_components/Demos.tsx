import React from "react"
import Image from "next/image"

import { Skill } from "@/components/icons"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-card"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"

const Demos = () => {
	return (
		<div className="w-screen p-10 flex flex-wrap items-center justify-center gap-4">
			{[1, 2, 3, 4, 5, 6].map((elm) => {
				return (
					<div
						key={elm}
						className="border border-[#D9DAE1] p-5 pb-4 flex flex-col items-center gap-6 rounded-[24px]"
					>
						<div className="flex flex-col items-center">
							<Image
								src={`/images/home-agent-${elm}.png`}
								alt="demo"
								width={44}
								height={44}
							/>
							<p className="text-xl mt-2">Scott</p>
							<p className="text-[#62636C]">Developer</p>
						</div>
						<div className="border-t border-[#D9DAE1] pt-2 grid grid-cols-2 gap-8">
							<div className="flex gap-2 items-center text-[#62636C]">
								<Eye className="min-h-[14px] min-w-[14px]" />
								<p className="text-xs text-nowrap">23 Views</p>
							</div>
							<div className="flex gap-2 items-center">
								<Skill className="min-h-[14px] min-w-[14px]" />
								<p className="text-xs text-nowrap">12 Skills</p>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Demos
