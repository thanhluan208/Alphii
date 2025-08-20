import React from "react"

import { SafariIcon } from "@/components/icons"
import { Link } from "@/i18n/routing"

interface PreviewContentProps {
	domainUrl?: string
	project_name?: string
}

const PreviewContent = ({ domainUrl, project_name }: PreviewContentProps) => {
	return (
		<div className="w-full h-full flex flex-col overflow-hidden">
			<div className="bg-background  py-2 px-2.5 relative flex items-center justify-center">
				<div className="border flex items-center text-sm gap-1 h-9 px-1.5 rounded-full border-[#393A3F] w-[75%] ">
					<SafariIcon className="w-4 h-4 text-primary" />
					<p className="text-primary">{project_name}</p> /
					<Link
						target="_blank"
						href={`http://${domainUrl}`}
						className="cursor-pointer ml-1 hover:underline"
					>{`http://${domainUrl}`}</Link>
				</div>
			</div>
			<div className="flex-1">
				<iframe
					src={`http://${domainUrl}`}
					className="w-full h-full border-0"
					title="Interactive Website"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		</div>
	)
}

export default PreviewContent
