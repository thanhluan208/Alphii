import React, { useMemo, useState } from "react"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

import {
	AccountIcon,
	ConnectedAppsIcon,
	CustomizeIcon,
	DataControlIcon
} from "../../icons"
import Account from "./Account"

enum UserSettingTab {
	Account = "account",
	Customize = "customize",
	DataControl = "data-control",
	ConnectedApps = "connected-apps"
}

const UserSetting = () => {
	const [activeTab, setActiveTab] = useState<UserSettingTab>(
		UserSettingTab.Account
	)

	const listIcons = useMemo(() => {
		return [
			{
				icon: <AccountIcon />,
				label: "Account",
				value: UserSettingTab.Account
			},
			{
				icon: <CustomizeIcon />,
				label: "Customize",
				value: UserSettingTab.Customize
			},
			{
				icon: <DataControlIcon />,
				label: "Data Control",
				value: UserSettingTab.DataControl
			},
			{
				icon: <ConnectedAppsIcon />,
				label: "Connected Apps",
				value: UserSettingTab.ConnectedApps
			}
		]
	}, [])

	const renderContent = () => {
		switch (activeTab) {
			case UserSettingTab.Account:
				return <Account />
		}
	}
	return (
		<Dialog>
			<DialogTrigger className="h-11 w-11 rounded-xl bg-alphii_bg_soft_200 text-alphii-text-sub-600">
				PH
			</DialogTrigger>
			<DialogContent className="h-[478px] w-[702px] min-w-[702px] flex flex-col">
				<DialogHeader>
					<DialogTitle>Setting</DialogTitle>
					<DialogDescription className="hidden" />
				</DialogHeader>
				<div className="mt-3 flex gap-8">
					<div className="w-[149px] flex flex-col gap-1">
						{listIcons.map((tab) => (
							<button
								onClick={() => setActiveTab(tab.value)}
								key={tab.value}
								className={cn(
									"h-9 w-full flex items-center text-alphii_text_sub_600 gap-1.5 text-sm hover:bg-alphii_bg_weak_50 hover:text-[unset] rounded-lg p-1.5 bg-transparent transition-all",
									activeTab === tab.value && "bg-alphii_bg_weak_50 text-[unset]"
								)}
							>
								{tab.icon}
								<span>{tab.label}</span>
							</button>
						))}
					</div>
					{renderContent()}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default UserSetting
