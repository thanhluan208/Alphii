import React from "react"
import { useTranslations } from "next-intl"

import InputIcon from "@/components/common/InputIcon"
import { SearchIcon } from "@/components/icons"
import { Button, Skeleton } from "@/components/ui"
import { Link } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { Plus } from "lucide-react"

import NewProjectButton from "./NewProjectButton"

const Project = () => {
	const translation = useTranslations("project")
	return (
		<div className="max-w-[900px] w-screen mx-auto p-5 pt-[75px] ">
			<div className="flex justify-between items-center">
				<div>
					<p className="text-xl font-semibold">
						{translation("yourProjectsTitle")}
					</p>
					<p className="text-sm text-alphii_text_sub_600">
						{translation("yourProjectsSubtitle")}
					</p>
				</div>

				<NewProjectButton />
			</div>

			<div className="mt-6 grid lg:grid-cols-3 grid-cols-1 gap-x-5 gap-y-2">
				<div>
					<Skeleton className="w-full h-[180px]" />
					<p className="text-sm font-medium mt-3">
						{translation("projectCardTitle")}
					</p>
					<p className="text-alphii_text_sub_600">
						{translation("projectCardDescription")}
					</p>
				</div>
				<div>
					<Skeleton className="w-full h-[180px]" />
					<p className="text-sm font-medium mt-3">
						{translation("projectCardTitle")}
					</p>
					<p className="text-alphii_text_sub_600">
						{translation("projectCardDescription")}
					</p>
				</div>
				<div>
					<Skeleton className="w-full h-[180px]" />
					<p className="text-sm mt-3 font-medium">
						{translation("projectCardTitle")}
					</p>
					<p className="text-alphii_text_sub_600">
						{translation("projectCardDescription")}
					</p>
				</div>
			</div>

			<div className="flex justify-between items-center mt-[60px]">
				<div>
					<p className="text-xl font-semibold">
						{translation("latestFromCommunityTitle")}
					</p>
					<p className="text-sm text-alphii_text_sub_600">
						{translation("latestFromCommunitySubtitle")}
					</p>
				</div>

				<InputIcon
					className="w-[300px]"
					iconLeft={<SearchIcon />}
					placeholder={translation("searchPlaceholder")}
				/>
			</div>

			<div className="mt-8 grid lg:grid-cols-3 grid-cols-1 gap-x-5 gap-y-2">
				{Array.from({ length: 6 }).map((_, index) => {
					return (
						<div key={index}>
							<Skeleton className="w-full h-[180px]" />
							<p className="text-sm font-medium mt-3">
								{translation("projectCardTitle")}
							</p>
							<p className="text-alphii_text_sub_600">
								{translation("projectCardDescription")}
							</p>
						</div>
					)
				})}

				{/* <div className="col-span-3 flex items-center justify-center mt-5">
					<Link
						href={Routes.STUDIO}
						className="bg-black flex items-center justify-center dark:bg-white text-white dark:text-black mx-auto w-[112px] h-10 rounded-full"
					>
						<Plus />
					</Link>
				</div> */}
			</div>
		</div>
	)
}

export default Project
