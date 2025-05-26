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
						$20
					</p>
				)
			case "plus+":
				return (
					<p className="text-[40px] font-[500] leading-[48px] text-[#1E1F24]">
						$50
					</p>
				)
			case "custom":
				return (
					<p className="text-[40px] font-[500] leading-[48px] text-[#1E1F24]">
						$100
					</p>
				)
		}
	}

	const subTitle = () => {
		switch (variant) {
			case "basic":
				return (
					<span className="text-xs text-[#1E1F24]">
						Perfect for casual users exploring Alphii at their own pace with
						curiosity and ease
					</span>
				)
			case "plus+":
				return (
					<span className="text-xs text-[#1E1F24]">
						Designed for regular users engaging with Alphii daily for steady,
						reliable access
					</span>
				)
			case "custom":
				return (
					<span className="text-xs text-[#1E1F24]">
						Built for expert users relying on Alphii as a core tool for
						high-performance work
					</span>
				)
		}
	}

	const content = () => {
		switch (variant) {
			case "basic":
				return (
					<div className="grid text-black grid-cols-[50px_1fr] mt-5 gap-y-2 items-center">
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">10M Token</p>
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">
							Advance teams concurrence executions
						</p>
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">Support advance features</p>
					</div>
				)
			case "plus+":
				return (
					<div className="grid text-black grid-cols-[50px_1fr] mt-5 gap-y-2 items-center">
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">25M Token</p>
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">
							Unlimited teams concurrent executions
						</p>
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">
							Fully support advance features
						</p>
					</div>
				)
			case "custom":
				return (
					<div className="grid text-black grid-cols-[50px_1fr] mt-5 gap-y-2 items-center">
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">100M Token</p>
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">
							Unlimited teams concurrent executions
						</p>
						<Check className="text-[#06BF78]" />
						<p className="text-xs font-semibold">
							Fully support advance features
						</p>
					</div>
				)
		}
	}

	return (
		<div
			className={cn(
				"border-2 p-1.5 rounded-3xl",
				variant === "basic" ? "border-primary" : "border-[#EFF0F3]"
			)}
		>
			<div
				className={cn(
					"rounded-t-[18px] p-4 flex flex-col gap-7",
					card({ variant, className })
				)}
			>
				<div className="flex gap-5 items-center">
					{icon()}
					<p className="font-[500] text-2xl leading-8">{capitalize(variant)}</p>
				</div>
				<div className="flex flex-col gap-2">
					{price()}
					<p className="text-base leading-6 text-alphii_text_sub_600">
						Per user/month, billed monthly
					</p>
				</div>
				<div>
					<p className="text-sm font-semibold">{subTitle()}</p>
					{content()}
				</div>
			</div>
			<Button
				type="button"
				className={cn(
					"h-[52px] w-full rounded-b-[20px] rounded-t-none",
					variant !== "basic" && "bg-alphii_bg_weak_50"
				)}
				variant={variant === "basic" ? "default" : "ghost"}
			>
				{translation("lGetStartedForFree")}
			</Button>
		</div>
	)
}

export default PriceCard
