import React from "react"
import Image from "next/image"

import {
	CalendarRefreshIcon,
	EditProfileIcon,
	LogoutIcon,
	TokenMutedIcon
} from "@/components/icons"
import { Button } from "@/components/ui"
import GradientBorderCard from "@/components/ui/gradient-border-card"

const Account = () => {
	const totalCredit = 1250
	const dailyCredit = 300

	return (
		<div className="flex flex-col gap-5 flex-1">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2.5">
					<Image
						width={36}
						height={36}
						src="/images/agents/bob-avatar.png"
						alt="user-setting-1"
						className="rounded-full"
					/>
					<div>
						<p className="text-sm font-medium">Full User Name</p>
						<p className="text-sm font-normal">useremail@gmail.com</p>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<button className="h-8 w-8 bg-alphii_bg_weak_50 hover:bg-alphii_bg_weak_40 rounded-[10px] flex items-center justify-center">
						<EditProfileIcon />
					</button>
					<button className="h-8 w-8 bg-alphii_destructive_light hover:bg-alphii_destructive_light/80 rounded-[10px] flex items-center justify-center">
						<LogoutIcon className="text-destructive" />
					</button>
				</div>
			</div>

			<GradientBorderCard className="p-[1px] rounded-2xl">
				<div className="px-5 py-4 w-full h-full bg-alphii_bg_weak_50 rounded-[15px]">
					<div className="flex justify-between items-center">
						<p className="text-alphii_bg_strong font-medium">Free Plan</p>

						<button className="p-2 w-20 text-sm font-medium rounded-[10px] bg-alphii_bg_strong  text-white dark:text-black">
							Upgrade
						</button>
					</div>

					<div className="w-full h-[1px] bg-[#EBEBEB] my-2.5" />

					<div className="flex justify-between items-center h-8">
						<div className="flex gap-1.5 items-center">
							<TokenMutedIcon className="text-alphii_text_sub_600" />
							<p className="text-sm font-medium">Credit</p>
						</div>

						<p className="text-sm font-medium">
							{totalCredit?.toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}{" "}
							credits
						</p>
					</div>
					<div className="flex justify-between items-center h-8 mt-1.5">
						<div className="flex gap-1.5 items-center">
							<CalendarRefreshIcon className="text-alphii_text_sub_600" />
							<p className="text-sm font-medium">Daily Refresh Credit</p>
						</div>

						<p className="text-sm font-medium">
							{dailyCredit?.toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}{" "}
							credits
						</p>
					</div>
				</div>
			</GradientBorderCard>
		</div>
	)
}

export default Account
