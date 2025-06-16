'use client'

import { AiIconFill, ClassifyIconFill } from "@/components/icons"
import { Link } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { usePathname } from "next/navigation"
import React from "react"

const Navigation = () => {
	const pathname = usePathname()
	const isStudio = pathname.includes('/studio')
	const isProject = pathname.includes('/project')

	return (
		<div className="absolute top-2/4 left-2/4 p-0.5 -translate-x-2/4 -translate-y-2/4 rounded-full border border-alphii_bg_soft_200">
			<Link
				href={Routes.STUDIO}
				className={`h-[34px] w-[34px] transition-all rounded-full text-background flex items-center justify-center ${
					isStudio ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-transparent text-muted'
				}`}
			>
				<AiIconFill />
			</Link>
			<Link
				href={Routes.PROJECT}
				className={`h-[34px] w-[34px] transition-all rounded-full text-alphii_text_sub_600 flex items-center justify-center ${
					isProject ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-transparent text-muted'
				}`}
			>
				<ClassifyIconFill />
			</Link>
		</div>
	)
}

export default Navigation
