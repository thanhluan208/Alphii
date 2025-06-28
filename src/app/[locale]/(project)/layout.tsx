import { ReactNode } from "react"
import Link from "next/link"

import {
	AiIconFill,
	ClassifyIconFill,
	LogoIcon,
	QuestionIcon,
	SettingIcon
} from "@/components/icons"
import { Routes } from "@/lib/constant"

import Navigation from "./_components/Navigation"

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex w-full h-full min-h-screen">
			<div className="w-[70px]  p-4 h-screen sticky top-0 border-r border-alphii_bg_soft_200 flex flex-col justify-between items-center">
				<Link href={Routes.ROOT}>
					<LogoIcon />
				</Link>

				<div className="flex flex-col gap-1.5">
					<button className="h-[38px] w-[38px] rounded-full border border-alphii_bg_soft_200 flex items-center justify-center">
						<QuestionIcon />
					</button>
					<button className="h-[38px] w-[38px] rounded-full border border-alphii_bg_soft_200 flex items-center justify-center">
						<SettingIcon />
					</button>
					<button className="h-[38px] w-[38px] text-sm font-medium text-alphii_text_sub_600 rounded-full  bg-alphii_bg_weak_50 flex items-center justify-center">
						PH
					</button>
				</div>

				<Navigation />
			</div>
			{children}
		</div>
	)
}

export default layout
