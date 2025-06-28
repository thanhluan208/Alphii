import { TextPlaceholderIcon, VisualizeDataIcon } from "@/components/icons"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import React from "react"

const CardV1 = () => {
	return (
		<div>
			<div className="mt-10 flex gap-2.5 ">
				<div className="w-[300px] overflow-hidden cursor-pointer bg-[linear-gradient(162.93deg,#0CC6FF_27.65%,#97FFFC_67.6%)] border-[#ffffff73] rounded-2xl border-2">
					<div className="p-4 pb-3">
						<p className="text-[18px] font-semibold leading-6">
							Website Development
						</p>
						<p className="text-sm mix-blend-overlay">
							Landing pages. Multi-page website. Our team got you covered.
						</p>
					</div>
					<div className="w-full h-[108px] relative ">
						<Image
							src={"/images/project/website-development.png"}
							width={166}
							height={98}
							alt="website-developement"
							className="absolute bottom-0 right-2.5 z-10"
						/>

						<div className="top-4 left-4 absolute -rotate-[4.63deg]">
							<Image
								src={"/images/project/website-frame-blur.png"}
								width={112.41}
								height={126.62}
								alt="frame"
							/>
						</div>
						<div className="top-4 left-[72px] absolute rotate-[8.32deg]">
							<Image
								src={"/images/project/website-frame.png"}
								width={112.41}
								height={126.62}
								alt="frame"
							/>
						</div>
					</div>
				</div>
				<div className="w-[434px] overflow-hidden cursor-pointer bg-[linear-gradient(162.93deg,#00C355_27.65%,#A7FF97_67.6%)] border-[#ffffff73] rounded-2xl border-2">
					<div className="p-4 pb-3">
						<p className="text-[18px] font-semibold leading-6">
							Fully working miniapp
						</p>
						<p className="text-sm mix-blend-overlay">
							Tell us what you need, and we’ll build it from the ground up—fast,
							focused, and ready to launch.
						</p>
					</div>
					<div className="w-full h-[108px] relative ">
						<div className="top-4 p-2.5 left-[75px] absolute w-[140.22px] h-[101.98px] bg-black rounded-xl -rotate-[7.84deg]">
							<p className="text-xs font-semibold">
								A Flashcard reminder App for Korean Learning
							</p>
							<p className="text-[8px] mt-1.5 text-alphii_text_sub_600">
								Our software development can make it alive
							</p>
						</div>
						<div className="top-4 p-2.5 left-[204px] shadow-[0_20px_13px_rgba(0,0,0,0.9)] absolute w-[140.22px] h-[101.98px] bg-black rounded-xl rotate-[4.45deg]">
							<p className="text-xs font-semibold">
								Or you wanna build a tool at ease?
							</p>
							<p className="text-[8px] mt-1.5 text-alphii_text_sub_600">
								Our software development can make it alive
							</p>
						</div>
						<div className="top-4 p-2.5 -right-[52.78px] shadow-[0_20px_13px_rgba(0,0,0,0.9)] absolute w-[151.05px] h-[109.85px] bg-[#FFC760] rounded-xl rotate-[9.28deg]">
							<p className="text-xs font-semibold text-[#714900]">Todo List</p>
							<div className="mt-1.5 flex flex-col gap-1">
								<div className="flex gap-1 items-center">
									<Checkbox className="border-[#A67519] h-4 w-4 rounded-[5px]" />
									<TextPlaceholderIcon className="translate-y-[7px]" />
								</div>
								<div className="flex gap-1 items-center">
									<Checkbox className="border-[#A67519] h-4 w-4 rounded-[5px]" />
									<TextPlaceholderIcon className="translate-y-[7px]" />
								</div>
								<div className="flex gap-1 items-center">
									<Checkbox className="border-[#A67519] h-4 w-4 rounded-[5px]" />
									<TextPlaceholderIcon className="translate-y-[7px]" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-2.5 flex gap-2.5 ">
				<div className="w-[241.33px] cursor-pointer overflow-hidden bg-[linear-gradient(140.93deg,#8E0CFF_11.65%,#D497FF_77.6%)] border-[#ffffff73] rounded-2xl border-2">
					<div className="p-4 pb-3">
						<p className="text-[18px] font-semibold leading-6">
							Turn data into visualized dashboard
						</p>
						<p className="text-sm mix-blend-overlay">
							From raw data into clear, and actionable visual dashboards.
						</p>
					</div>
					<VisualizeDataIcon />
				</div>

				<div className="w-[241.33px] cursor-pointer overflow-hidden bg-[linear-gradient(140.93deg,#FFA60C_11.65%,#FF6A6A_77.6%)] border-[#ffffff73] rounded-2xl border-2">
					<div className="p-4 pb-3">
						<p className="text-[18px] font-semibold leading-6">
							Design a pitch deck
						</p>
						<p className="text-sm mix-blend-overlay">
							Create a bold, clear, and convincing pitch deck that sells.
						</p>
					</div>
				</div>

				<div className="w-[241.33px]  overflow-hidden bg-[linear-gradient(140.93deg,#3B3B3B_11.65%,#6E6E6E_77.6%)] border-[#ffffff73] rounded-2xl border-2">
					<div className="p-4 pb-3">
						<p className="text-[18px] font-semibold leading-6">
							More stuff coming soon
						</p>
						<p className="text-sm mix-blend-overlay">
							More powerful tools and features are on the way soon.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CardV1
