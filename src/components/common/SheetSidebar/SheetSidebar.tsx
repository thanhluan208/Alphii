import React, { memo, useState } from "react"

import {
	CollapseIcon,
	HelpCenterIcon,
	Logo,
	LogoutIcon,
	ProfileIcon,
	SettingIcon,
	SubscriptionIcon
} from "@/components/icons"
import { Button } from "@/components/ui"
import GradientBorderCard from "@/components/ui/gradient-border-card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search } from "lucide-react"

import InputIcon from "../InputIcon"
import ChatHistory from "./ChatHistory"

const SheetSidebar = () => {
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<Button
				onClick={() => setOpen(true)}
				onMouseEnter={() => setOpen(true)}
				variant="ghost"
				className="h-11 w-11 text-card-foreground rounded-xl bg-card border border-alphii_border"
			>
				<CollapseIcon />
			</Button>
			<SheetContent side={"left"}>
				<div className="bg-alphii_bg_weak_50 h-full px-4 py-6 rounded-xl border border-alphii_border_2">
					<Logo />

					<Button className="w-full mt-10">Start a new chat</Button>

					<InputIcon
						className="my-5"
						iconLeft={<Search className="h-5 w-5" />}
						placeholder="Search"
					/>

					<p className="text-xs font-medium text-alphii_text_sub_600">
						Your Chats
					</p>

					<ChatHistory />

					<div className="rounded-[20px] flex gap-2.5 flex-col bg-background p-2.5 border border-alphii_border_2">
						<button className="flex gap-3.5 items-center font-medium bg-transparent border-0 h-11 p-2">
							<ProfileIcon />
							Profile
						</button>
						<button className="flex justify-between items-center font-medium bg-transparent border-0 h-11 p-2">
							<div className="flex gap-3.5 items-center">
								<SubscriptionIcon />
								Subscription
							</div>

							<div className="bg-[linear-gradient(180deg,#F2F2FF_0%,#E4E4FF_100%)] flex items-center justify-center h-6 w-[50px] rounded-md border-primary shadow-sm border px-2 py-1 uppercase text-primary">
								free
							</div>
						</button>
						<button className="flex gap-3.5 items-center font-medium bg-transparent border-0 h-11 p-2">
							<SettingIcon />
							Settings
						</button>

						<div className="w-full h-[1px] bg-alphii_border_2" />

						<button className="flex gap-3.5 items-center font-medium bg-transparent border-0 h-11 p-2">
							<HelpCenterIcon />
							Help Center
						</button>

						<button className="flex gap-3.5 text-destructive items-center font-medium bg-transparent border-0 h-11 p-2">
							<LogoutIcon />
							Sign out
						</button>

						<div className="w-full h-[1px] bg-alphii_border_2" />

						<div className="border flex items-center justify-between border-alphii_border_2 p-3 rounded-2xl">
							<div className="flex flex-col justify-between">
								<p className="font-medium">Full Name</p>
								<p className="text-sm text-alphii_text_sub_600">
									username@email.com
								</p>
							</div>

							<GradientBorderCard className="w-[46.4px] h-[46.4px] rounded-full py-[1.6px] px-0.5">
								<button className="w-full h-full rounded-full flex items-center justify-center bg-background p-[1.6px]">
									<div className="w-full h-full rounded-full flex items-center justify-center bg-alphii_bg_soft_200">
										PH
									</div>
								</button>
							</GradientBorderCard>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default memo(SheetSidebar)
