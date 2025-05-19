import Image from "next/image"

import { PromptIcon, TokenIcon } from "@/components/icons"
import { Button } from "@/components/ui"
import GradientBorderCard from "@/components/ui/gradient-border-card"
import { ArrowUp, AtSign, ChevronRight } from "lucide-react"

import Case from "./components/Case"

const Showcases = () => {
	return (
		<div>
			<div className="sticky top-0 left-0 w-full h-14 bg-background z-50 flex items-center justify-between px-10">
				<Image src={"/images/logo.png"} alt="logo" width={86} height={23.71} />
			</div>
			<div className="py-[60px] px-[60px] lg:px-[200px]">
				<div className="max-w-[1400px] mx-auto">
					<p className="text-3xl leading-9 font-semibold text-center">
						See how others like you are building{" "}
						<span className="text-alphii_primary">web projects</span>,<br />
						<span className="text-alphii_primary_50">
							data processing, presentations,
						</span>{" "}
						and more
					</p>

					<GradientBorderCard className="p-[3px] mt-10 w-[740px] mx-auto h-[180px] rounded-3xl ">
						<div className="absolute top-[3px] left-[3px] p-3 h-[calc(100%-6px)] flex justify-between flex-col w-[calc(100%-6px)] bg-white rounded-[21px]">
							<textarea
								className="w-full placeholder:text-[#62636C] focus-visible:outline-none resize-none px-2 min-h-5 h-[100px] overflow-y-auto"
								placeholder="Tell us what you’re building. We’ll help you assign the team to build"
							/>

							<div className="flex items-center justify-between">
								<div className="flex gap-2 text-sm">
									<div className="rounded-full flex gap-1 px-2.5 items-center py-0.5 border border-alphii_border">
										<AtSign className="text-[#80828D] h-4 w-4" />
										<p className="font-[500]">Mention</p>
									</div>
									<div className="rounded-full flex gap-1 px-2.5 items-center py-0.5 border border-alphii_border">
										<PromptIcon className="text-[#80828D]" />
										<p className="font-[500]">Prompt Library</p>
									</div>
								</div>

								<div className="bg-[linear-gradient(167.91deg,rgba(218,218,218,0.55)_7.43%,rgba(232,232,232,0.55)_49.31%,rgba(196,196,196,0.55)_91.18%)] rounded-full p-0.5 flex items-center gap-1 ">
									<div className="border border-alphii_border px-3 py-0.5 h-8 rounded-full flex items-center gap-1 bg-background">
										<TokenIcon />
										<p className="text-sm font-[500]">213</p>
									</div>

									<Button
										variant="ghost"
										className="rounded-full text-white hover:text-white w-8 h-8 p-0 flex items-center justify-center border border-white bg-[linear-gradient(124.94deg,#B7C0FF_-3.78%,#3B54FF_29.53%,#EA8CFF_62.84%,#7485FF_96.14%)]"
									>
										<ArrowUp />
									</Button>
								</div>
							</div>
						</div>
					</GradientBorderCard>

					<div className="h-[1px] w-full bg-alphii_border my-10" />

					<div className="py-3 flex justify-between">
						<div>
							<p className="text-xl font-[500]">Community Showcases</p>
							<p className="text-sm text-alphii_text_sub_600">
								Please ensure the following items are completed so that you can
								start using Alphii AI
							</p>
						</div>

						<Button
							variant="ghost"
							className="h-10 shadow-none border-alphii_border rounded-lg p-0 px-3 py-2.5 w-fit"
						>
							View all <ChevronRight className="ml-2" />
						</Button>
					</div>

					<div className="mt-5 grid lg:grid-cols-4 lg:gap-5">
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((elm) => (
							<Case key={elm} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Showcases
