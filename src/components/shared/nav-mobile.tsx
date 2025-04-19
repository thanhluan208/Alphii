import React from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"

import { Menu } from "lucide-react"

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "../ui/sheet"
import { Nav } from "./nav"

const NavMobile = () => {
	const t = useTranslations("layout")

	return (
		<Sheet>
			<SheetTrigger className="lg:hidden">
				<Menu />
			</SheetTrigger>
			<SheetContent side={"left"} className="w-[266px] p-0">
				<SheetHeader>
					<div className="flex gap-2.5 items-center p-4">
						<Image
							src="/imgs/tour-planet-logo.png"
							alt="logo"
							width="56"
							height="56"
						/>
						<SheetTitle className="font-nico text-xl  whitespace-break-spaces leading-4 uppercase">
							{t("title")}
						</SheetTitle>
					</div>
				</SheetHeader>

				<div className="flex  flex-col w-[266px] px-6 gap-4 pt-10 h-full ">
					<p className="text-primary leading-[18px] font-semibold">
						{t("general")}
					</p>
					<Nav />
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default NavMobile
