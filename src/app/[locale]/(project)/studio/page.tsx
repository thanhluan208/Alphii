"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

import ChatContent from "../../../../components/common/Chat/ChatContent"
import ChatInput from "../../../../components/common/Chat/ChatInput"
import Header from "./components/Header"
import Preview from "./components/preview/Preview"
import StudioTemplateCard from "./components/StudioTemplateCard"

const Studio = () => {
	return (
		<div className="px-5 flex flex-col flex-1 w-full ">
			<Header />

			<div
				className={cn(
					"flex w-full items-end h-[calc(100vh-72px)] px-5 min-w-[1220px] pb-5"
				)}
			>
				<div className="relative pb-5 flex h-full flex-1 flex-col px-5 items-center ">
					<Image
						src="/images/project/project-bg.png"
						fill
						priority
						alt="bg"
						className="absolute !top-2/4 !left-2/4 opacity-10 !-translate-x-2/4 !-translate-y-2/4 !w-3/4 !h-3/4"
					/>

					<StudioTemplateCard />

					<ChatContent />

					<ChatInput />
				</div>
				<Preview />
			</div>
		</div>
	)
}

export default Studio
