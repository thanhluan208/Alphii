import React from "react"
import Image from "next/image"

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-card"
import { cn } from "@/lib/utils"

const Demos = () => {
	return (
		<div className="w-screen">
			<InfiniteMovingCards
				className="mt-6 max-w-[unset]"
				items={Array.from({ length: 10 }, (_, i) => (
					<div key={i} className="py-1 px-6 flex items-center justify-center">
						<div
							className={cn(
								"col-span-1 relative z-0 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[34px] before:p-[2px] before:bg-[linear-gradient(156.1deg,#896FDF_3.87%,rgba(137,111,223,0.3)_84.65%)]",
								"rounded-[32px] p-0.5 "
							)}
						>
							<div className="w-full h-full bg-[linear-gradient(162.24deg,#221C3A_0.05%,rgba(10,8,18,0.9)_87.87%)] flex flex-col gap-[90px] rounded-[32px] p-5">
								<div className="h-11 w-11 flex items-center justify-center rounded-lg bg-[#F7B6BD]">
									<Image
										src={"/images/agents/bob.png"}
										alt="bob"
										width={40}
										height={40}
									/>
								</div>
								<p className="w-[227px]">
									Scott, Developer.
									<span className="text-[#FFFFFF8C]">Acquired</span> 5 skills &
									10 tools <span className="text-[#FFFFFF8C]">in</span> software
									development
								</p>
							</div>
						</div>
					</div>
				))}
				direction="right"
				speed="slow"
			/>
		</div>
	)
}

export default Demos
