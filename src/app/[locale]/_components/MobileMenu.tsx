"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SmoothLink } from "@/components/ui/smooth-link"
import { Menu, X } from "lucide-react"
import { DialogTitle } from "@/components/ui/dialog"

const MobileMenu = () => {
	const translate = useTranslations("home")

	const [open, setOpen] = useState(false)

	const handleLinkClick = () => {
		setOpen(false)
	}

	return (
		<Sheet onOpenChange={setOpen} open={open}>
			<SheetTrigger className="h-9 w-9 md:hidden flex items-center justify-center rounded-full border-2 border-[#EAEAEA] shadow-xl">
				<Menu size={16} />
			</SheetTrigger>
			<SheetContent
				side="top"
				className="h-screen p-5 bg-black flex flex-col gap-5"
			>
				<DialogTitle className="hidden">Menu</DialogTitle>
				<button className="fixed top-5 right-5" onClick={() => setOpen(false)}>
					<X />
				</button>
				<SmoothLink
					delay={400}
					className="hover:text-primary font-semibold"
					href="#feature"
					onClick={handleLinkClick}
				>
					{translate("feature")}
				</SmoothLink>
				<SmoothLink
					delay={400}
					className="hover:text-primary font-semibold"
					href="#documents"
					onClick={handleLinkClick}
				>
					{translate("documents")}
				</SmoothLink>
				<SmoothLink
					delay={400}
					className="hover:text-primary font-semibold"
					href="#how-it-work"
					onClick={handleLinkClick}
				>
					{translate("howItWorks")}
				</SmoothLink>
				<SmoothLink
					delay={400}
					className="hover:text-primary font-semibold"
					href="#pricing"
					onClick={handleLinkClick}
				>
					{translate("pricing")}
				</SmoothLink>
				<SmoothLink
					delay={400}
					className="hover:text-primary font-semibold"
					href="#faqs"
					onClick={handleLinkClick}
				>
					{translate("faqs")}
				</SmoothLink>
			</SheetContent>
		</Sheet>
	)
}

export default MobileMenu
