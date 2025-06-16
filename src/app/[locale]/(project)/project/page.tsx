import React from "react"

import InputIcon from "@/components/common/InputIcon"
import { SearchIcon } from "@/components/icons"
import { Button, Skeleton } from "@/components/ui"
import { Link } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { Plus } from "lucide-react"

const Project = () => {
	return (
		<div className="max-w-[900px] w-screen mx-auto p-5 pt-[75px] ">
			<div className="flex justify-between items-center">
				<div>
					<p className="text-xl font-semibold">Your projects</p>
					<p className="text-sm text-alphii_text_sub_600">
						Public projects from our community members, just like you
					</p>
				</div>

				<Button className="px-5 py-2 w-fit">New Project</Button>
			</div>

			<div className="mt-6 grid lg:grid-cols-3 grid-cols-1 gap-x-5 gap-y-2">
				<div>
					<Skeleton className="w-full h-[180px]" />
					<p className="text-sm font-medium mt-3">Korean Flashcard Website</p>
					<p className="text-alphii_text_sub_600">
						Just tell the team how you want your website to look like
					</p>
				</div>
				<div>
					<Skeleton className="w-full h-[180px]" />
					<p className="text-sm font-medium mt-3">Korean Flashcard Website</p>
					<p className="text-alphii_text_sub_600">
						Just tell the team how you want your website to look like
					</p>
				</div>
				<div>
					<Skeleton className="w-full h-[180px]" />
					<p className="text-sm mt-3 font-medium">Korean Flashcard Website</p>
					<p className="text-alphii_text_sub_600">
						Just tell the team how you want your website to look like
					</p>
				</div>
			</div>

			<div className="flex justify-between items-center mt-[60px]">
				<div>
					<p className="text-xl font-semibold">Latest from the community</p>
					<p className="text-sm text-alphii_text_sub_600">
						Public projects from our community members, just like you
					</p>
				</div>

				<InputIcon
					className="w-[300px]"
					iconLeft={<SearchIcon />}
					placeholder="Search"
				/>
			</div>

			<div className="mt-8 flex flex-col gap-5">
				{Array.from({ length: 6 }).map((_, index) => {
					return (
						<div key={index} className="flex gap-3 items-center">
							<Skeleton className="w-[120px] h-20" />
							<div>
								<p className="text-sm font-medium mt-3">
									Korean Flashcard Website
								</p>
								<p className="text-alphii_text_sub_600">
									Just tell the team how you want your website to look like
								</p>
							</div>
						</div>
					)
				})}

				<Link
					href={Routes.STUDIO}
					className="bg-black flex items-center justify-center dark:bg-white text-white dark:text-black mx-auto w-[112px] h-10 rounded-full"
				>
					<Plus />
				</Link>
			</div>
		</div>
	)
}

export default Project
