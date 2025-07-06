"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"

import { cn } from "@/lib/utils"

enum Tab {
	software = "softwareDevelopment",
	data = "dataAnalyst",
	education = "education",
	marketing = "marketing",
	humanResources = "humanResources"
}

const TabList = () => {
	const [tab, setTab] = useState(Tab.software)
	const translate = useTranslations("home")

	return (
		<div className="mt-5">
			<div className="w-[600px] p-1 flex gap-1 rounded-full max-w-[calc(100vw-48px)] overflow-x-auto no-scrollbar border border-[#E7E8EC] relative">
				{Object.values(Tab).map((elm) => {
					return (
						<button
							key={elm}
							onClick={() => setTab(elm)}
							className={cn(
								"h-10 flex text-sm items-center px-3 text-nowrap py-2.5 text-[#8B8D98] transition-colors rounded-full -tracking-[1px] text-center",
								tab === elm && "bg-[#1E1F24] text-white"
							)}
						>
							{translate(elm)}
						</button>
					)
				})}
			</div>

			<div className="w-full h-[488px] md:h-[284px] p-5 overflow-hidden relative rounded-[32px] mt-10">
				<Image
					src="/images/home/tab-bg.webp"
					alt="tab"
					sizes="100%"
					fill
					className="w-full h-full object-cover"
				/>

				<div className="rounded-[18px] z-10 relative p-1 shadow-2xl bg-[linear-gradient(151.69deg,rgba(255,255,255,0.25)_10.91%,rgba(255,255,255,0.55)_82.5%)]">
					<div className="grid grid-cols-1 gap-y-1.5 md:grid-cols-2 rounded-2xl bg-white px-5">
						{Array.from({ length: 6 }).map((_, index) => {
							let src = "/images/agents/dany-avatar.png"

							if (index % 2 === 0) {
								src === "/images/agents/bob-avatar.png"
							}

							if (index % 3 === 0) {
								src = "/images/agents/ray-avatar.png"
							}

							if (index % 5 === 0) {
								src = "/images/agents/ray-1-avatar.png"
							}

							return (
								<div
									key={index}
									className={cn(
										"py-2.5 flex items-center gap-3 border-dashed border-[#EFF0F3]",
										index % 2 === 0 && "md:border-r",
										index % 2 === 1 && "md:pl-5",
										index < 5 && "border-b-[1.5px]"
									)}
								>
									<Image
										width={48}
										className="rounded-full"
										height={48}
										src={src}
										alt={String(index)}
									/>
									<div>
										<p className="font-medium">Dany</p>
										<p className="font-medium text-sm text-[#62636C]">
											{index === 0 ? "Manager" : "Engineer"}
										</p>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TabList
