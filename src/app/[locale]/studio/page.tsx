'use client'

import { useTheme } from "next-themes"

import { ExportIcon, Logo } from "@/components/icons"
import { Button } from "@/components/ui"
import { ThemeButton } from "@/components/ui/theme-button"
import { ChevronDown } from "lucide-react"

import Agents from "./components/Agents"
import CodeAndPreview from "./components/CodeAndPreview"
import Prompt from "./components/Prompt"

const Studio = () => {
	const { theme } = useTheme()

	return (
		<div className="w-screen h-screen bg-alphii_bg_weak_50">
			<div className="px-5 h-[60px] flex items-center border-b bg-card justify-between border-alphii_border_2">
				<Logo className="text-black dark:text-white w-[78px] h-[21.5px]" />
				<div className="flex gap-2">
					<ThemeButton />
					<Button
						variant="ghost"
						className="rounded-lg px-3 py-2 gap-1 h-9 w-fit"
					>
						<ExportIcon />
						Export
						<ChevronDown />
					</Button>
					<Button
						variant="ghost"
						className="text-card hover:text-card rounded-lg w-[100px] p-0 h-9"
						style={{
							background:
								theme === "light"
									? "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), #171717"
									: "linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 1) 100%), #fafafa"
						}}
					>
						Deploy
					</Button>
				</div>
			</div>
			<div className="h-[calc(100%-60px)] flex w-full">
				<div className="p-2 gap-2 lg:w-[calc(100%-550px)] w-full flex">
					<Agents />
					<CodeAndPreview />
				</div>

				<Prompt />
			</div>
		</div>
	)
}

export default Studio
