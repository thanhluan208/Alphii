import React, { useMemo } from "react"
import { useTranslations } from "next-intl"

import {
	BasicPriceIcon,
	CustomPriceIcon,
	PlusPriceIcon
} from "@/components/icons"
import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface PriceCardProps {
	type: "basic" | "plus" | "custom"
}

const PriceCard = ({ type }: PriceCardProps) => {
	const translate = useTranslations("home")

	const cardInfos = useMemo(() => {
		switch (type) {
			case "basic":
				return {
					icon: <BasicPriceIcon />,
					price: 20,
					token: "10M",
					executions: translate("advanceTeamsExecutions"),
					support: translate("supportAdvanceFeatures")
				}
			case "custom":
				return {
					icon: <CustomPriceIcon />,
					price: 50,
					executions: translate("unlimitedTeamsExecutions"),
					support: translate("fullySupportAdvanceFeatures"),
					token: "25M"
				}
			case "plus":
				return {
					icon: <PlusPriceIcon />,
					price: 100,
					executions: translate("unlimitedTeamsExecutions"),
					support: translate("fullySupportAdvanceFeatures"),
					token: "100M"
				}
			default:
				return {
					icon: <BasicPriceIcon />,
					price: 20,
					token: "10M",
					executions: translate("advanceTeamsExecutions"),
					support: translate("supportAdvanceFeatures")
				}
		}
	}, [type, translate])

	return (
		<div
			className={
				cn("border rounded-3xl hover:rotate-0 transition-all border-[#D8D9E0] md:w-[calc(100%-20px)] w-[300px] p-5 flex flex-col shadow-md",
				type === "custom" && "rotate-2",
				type === "plus" && "-rotate-2")
			}
		>
			<div className="flex flex-col gap-5 md:flex-row md:justify-between">
				<div className="flex flex-col gap-5">
					<div className="gap-3 flex items-center ">
						{cardInfos.icon} <p className="font-medium">{translate(type)}</p>
					</div>
					<div>
						<p className="text-[40px] font-medium">{`$ ${cardInfos.price}`}</p>
						<p className="text-sm text-[#62636C] ">
							{translate("perUserMonth")}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-1 text-sm font-medium">
					<div className="flex items-center gap-1">
						<div className="h-9 w-9  min-w-9 flex items-center justify-center">
							<Check size={16} />
						</div>
						<p>
							{cardInfos.token} {translate("token")}
						</p>
					</div>
					<div className="flex items-center gap-1">
						<div className="h-9 w-9  min-w-9 flex items-center justify-center">
							<Check size={16} />
						</div>
						<p>{cardInfos.executions}</p>
					</div>
					<div className="flex items-center gap-1">
						<div className="h-9 w-9  min-w-9 flex items-center justify-center">
							<Check size={16} />
						</div>
						<p>{cardInfos.support}</p>
					</div>
				</div>
			</div>

			<button
				className={cn(
					"w-full mt-3 text-center h-12 rounded-2xl hover:bg-[#1E1F24] hover:text-white transition-all text-white",
					type === "basic" ? " bg-[#1E1F24]" : "bg-[#EFF0F3] text-[#62636C]"
				)}
			>
				{type === "custom" ? translate("contactUs") : translate("upgrade")}
			</button>
		</div>
	)
}

export default PriceCard
