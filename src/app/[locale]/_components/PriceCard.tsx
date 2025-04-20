import React from "react"
import { useTranslations } from "next-intl"

import { BasicIcon, CustomPriceIcon, PlusIcon } from "@/components/icons"
import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { capitalize } from "lodash"
import { Check } from "lucide-react"

interface PriceCardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant: "basic" | "plus+" | "custom"
}

const card = cva("", {
	variants: {
		variant: {
			basic: "bg-[linear-gradient(180deg,#F1ECFF_0%,#FFFFFF_100%)]  ",
			"plus+": "bg-[linear-gradient(180deg,#FFEEDF_0%,#FFFFFF_100%)]",
			custom: "bg-white "
		}
	},
	defaultVariants: {
		variant: "basic"
	}
})

const PriceCard = ({ variant, className }: PriceCardProps) => {
	const translation = useTranslations("home")

	const icon = () => {
		switch (variant) {
			case "basic":
				return <BasicIcon />
			case "plus+":
				return <PlusIcon />
			case "custom":
				return <CustomPriceIcon />
		}
	}

	const price = () => {
		switch (variant) {
			case "basic":
				return (
					<p className="text-[40px] font-[500] leading-[48px] text-[#1E1F24]">
						$89
					</p>
				)
			case "plus+":
				return (
					<p className="text-[40px] font-[500] leading-[48px] text-[#1E1F24]">
						$89
					</p>
				)
			case "custom":
				return (
					<p className="text-[40px] font-[500] leading-[48px] text-[#1E1F24]">
						$89
					</p>
				)
		}
	}

	return (
		<div
			className={cn(
				"border-2 p-1.5 rounded-3xl",
				variant === "basic" ? "border-[#8E9CFF]" : "border-[#EFF0F3]"
			)}
		>
			<div
				className={cn(
					"rounded-[18px] p-4 flex flex-col gap-7",
					card({ variant, className })
				)}
			>
				<div className="flex gap-5 items-center">
					{icon()}
					<p className="font-[500] text-2xl leading-8">{capitalize(variant)}</p>
				</div>
				<div className="flex flex-col gap-2">
					{price()}
					<p className="text-base leading-6 text-[#62636C]">
						Per user/month, billed monthly
					</p>
				</div>
				<div>
					<p className="text-sm font-semibold">{translation("lForPersonal")}</p>
					<div className="mt-6 flex flex-col gap-3">
						<div className="h-9 w-full flex items-center gap-2.5">
							<div className="w-9 h-9 flex justify-center items-center">
								<Check className="text-[#06BF78]" />
							</div>
							<p>No Customization</p>
						</div>
						<div className="h-9 w-full flex items-center gap-2.5">
							<div className="w-9 h-9 flex justify-center items-center">
								<Check className="text-[#06BF78]" />
							</div>
							<p>No Customization</p>
						</div>
						<div className="h-9 w-full flex items-center gap-2.5">
							<div className="w-9 h-9 flex justify-center items-center">
								<Check className="text-[#06BF78]" />
							</div>
							<p>No Customization</p>
						</div>
						<div className="h-9 w-full flex items-center gap-2.5">
							<div className="w-9 h-9 flex justify-center items-center">
								<Check className="text-[#06BF78]" />
							</div>
							<p>No Customization</p>
						</div>
						<div className="h-9 w-full flex items-center gap-2.5">
							<div className="w-9 h-9 flex justify-center items-center">
								<Check className="text-[#06BF78]" />
							</div>
							<p>No Customization</p>
						</div>
					</div>
				</div>
			</div>
			<Button
				type="button"
				className={cn(
					"h-[52px] w-full rounded-b-[20px] rounded-t-sm",
					variant !== "basic" && "bg-[#EFF0F3]"
				)}
				variant={variant === "basic" ? "default" : "ghost"}
			>
				{translation("lGetStartedForFree")}
			</Button>
		</div>
	)
}

export default PriceCard
