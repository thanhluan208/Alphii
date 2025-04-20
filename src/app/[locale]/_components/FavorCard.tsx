import React from "react"

import { cn } from "@/lib/utils"

interface FavorCardProps extends React.HTMLAttributes<HTMLDivElement> {
	index: number
	title: string
	description: string
}

const FavorCard = ({
	index,
	title,
	description,
	className
}: FavorCardProps) => {
	return (
		<div
			className={cn(
				"bg-[#FCFCFD] rounded-3xl p-10 flex flex-col gap-10 border border-[#E7E8EC]",
				className
			)}
		>
			<p className="text-xl leading-7 font-bold text-[#3000BB]">{index}</p>
			<div>
				<p className="text-xl leading-7 font-bold text-[#1E1F24]">{title}</p>
				<p className="text-[18px] leading-6 mt-2.5 text-[#62636C]">
					{description}
				</p>
			</div>
		</div>
	)
}

export default FavorCard
