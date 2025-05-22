import React from "react"

import FolderTree from "@/components/common/FolderTree/FolderTreeNodes"
import { ExportIcon, Logo } from "@/components/icons"
import { Button } from "@/components/ui"
import { ChevronDown } from "lucide-react"

import Agents from "./components/Agents"
import CodeAndPreview from "./components/CodeAndPreview"
import Prompt from "./components/Prompt"

const Folder = () => {
	return (
		<div className="w-screen h-screen bg-alphii_bg_weak_50">
			<div className="px-5 h-[60px] flex items-center border-b bg-card justify-between border-alphii_border_2">
				<Logo className="text-black dark:text-white w-[78px] h-[21.5px]" />
				<div className="flex gap-2">
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
								"linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%), #171717"
						}}
					>
						Deploy
					</Button>
				</div>
			</div>
			<div className="h-[calc(100%-60px)] flex w-full">
				<div className="p-2 gap-2 flex-1 flex">
					<Agents />
					<CodeAndPreview />
				</div>

				<Prompt />
			</div>
		</div>
	)
}

export default Folder
