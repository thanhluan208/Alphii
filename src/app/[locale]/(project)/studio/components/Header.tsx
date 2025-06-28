"use client"

import { Button } from "@/components/ui"
import { ThemeButton } from "@/components/ui/theme-button"
import { useRouter } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { ChevronLeft, Ellipsis, History } from "lucide-react"

const Header = () => {
	const router = useRouter()

	return (
		<div className="w-full py-4 flex items-center justify-between">
			<Button
				variant="ghost"
				onClick={() => router.push(Routes.PROJECT)}
				className="w-fit p-0"
			>
				<ChevronLeft />
				Back
			</Button>
			<div className="flex gap-2">
				<ThemeButton className="w-6 h-6 p-0"/>
				<Button variant="ghost" className="w-6 h-6 p-0">
					<Ellipsis />
				</Button>
				<Button variant="ghost" className="w-6 h-6 p-0">
					<History />
				</Button>
			</div>
		</div>
	)
}

export default Header
