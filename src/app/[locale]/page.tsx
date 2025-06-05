import { useTranslations } from "next-intl"
import Image from "next/image"

import {
	ArrowUpRight,
	DoubleRobots,
	Linkedin,
	Logo,
	Punch,
	Template,
	Twitter
} from "@/components/icons"
import { Button, Input } from "@/components/ui"
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-card"
import { ThemeButton } from "@/components/ui/theme-button"
import { Link } from "@/i18n/routing"
import { Routes } from "@/lib/constant"

import Demos from "./_components/Demos"
import FAQs from "./_components/FAQs"
import PriceCard from "./_components/PriceCard"

const Home = () => {
	const translation = useTranslations("home")

	const tabs = [
		{
			id: 0,
			label: "Software Development",
			content: <Demos />
		},
		{
			id: 1,
			label: "Marketing",
			content: <Demos />
		},
		{
			id: 3,
			label: "Human Resources",
			content: <Demos />
		},
		{
			id: 4,
			label: "Finance",
			content: <Demos />
		}
	]

	return (
		<div className="relative flex flex-col items-center font-[500] overflow-hidden">
			<div className="fixed top-0 left-0 flex items-center bg-card justify-between w-full h-[80px]  z-50 px-4 md:px-8 lg:px-[150px] py-5 backdrop-blur-md">
				<div className="flex items-center gap-[60px]">
					<Logo className="w-[86px] h-[24px] text-card-foreground" />

					<div className="hidden md:flex gap-6 items-center text-alphii_text_sub_600">
						<Link href={"#feature"}>{translation("lFeature")}</Link>
						<Link href={"#about"}>{translation("lHowItWork")}</Link>
						<Link href={"#roadmap"}>{translation("lTestimonials")}</Link>
						<Link href={"#team"}>{translation("lPricing")}</Link>
						<Link href={"#faq"}>{translation("lFAQs")}</Link>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<ThemeButton />
					<Link href={Routes.LOGIN}>
						<Button className="items-center gap-2 w-fit">
							{translation("lGetStartedForFree")} <ArrowUpRight />
						</Button>
					</Link>
				</div>
			</div>
			<div className="w-full relative  max-w-[1250px] flex-col flex items-center  justify-center bg-center bg-cover px-4 md:px-8 lg:pb-[20px] lg:px-[150px] pt-[80px]">
				<div className="text-center flex items-center flex-col mt-[180px] z-10 relative">
					<p className="text-4xl sm:text-[64px] sm:leading-[72px] font-[500]">
						Build wonders with your customisable A2A team
					</p>
					<p className="font-[500] leading-6 text-alphii_text_sub_600 mt-3 lg:w-[528px]">
						Build agents that think and act—on their own, or with your team.
						They plan, talk, and get things done. No hand-holding. No downtime.
					</p>
				</div>
				<div className="mt-8 flex gap-3 z-10 relative">
					<Button variant="outline" className="items-center w-[159px] gap-2 ">
						<p>Watch a demo</p>
						<ArrowUpRight />
					</Button>
					<Link href={Routes.LOGIN}>
						<Button className="items-center gap-2 w-fit">
							{translation("lGetStartedForFree")} <ArrowUpRight />
						</Button>
					</Link>
				</div>

				<div>
					<Image
						src={"/images/home-bg.png"}
						alt="bg"
						fill
						className="!static"
					/>
				</div>
			</div>
			<div className="w-full relative  max-w-[1250px] flex-col flex items-center  justify-center bg-center px-4 md:px-8 lg:pb-[120px] lg:px-[60px] pt-[60px]">
				<div className="max-w-[100%]">
					<p className="text-center text-[32px] leading-10">
						Connect more apps.
						<br />
						<span className="text-alphii_text_sub_600">
							{" "}
							Unlock more capabilities.
						</span>
					</p>
					<div>
						<InfiniteMovingCards
							className="mt-6"
							items={Array.from({ length: 10 }, (_, i) => (
								<div
									key={i}
									className="py-1 px-6 flex items-center justify-center"
								>
									<Image
										src={"/images/home-software.png"}
										alt="code"
										width={111.56}
										height={28}
									/>
								</div>
							))}
							direction="right"
							speed="slow"
						/>
					</div>
				</div>
			</div>
			<div className="w-full relative  max-w-[1250px] flex-col flex items-center  justify-center bg-center px-4 md:px-8 lg:px-[60px]">
				<p className="text-center text-[32px] leading-10">
					Made for trust.
					<br />
					<span className="text-alphii_text_sub_600"> Designed for you.</span>
				</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[60px]">
					<div>
						<div className="bg-[#F9F9FB] flex flex-col h-full rounded-[16px] ">
							<Image
								src={"/images/home-illust-1.png"}
								alt="illust"
								fill
								className="!relative !w-full"
							/>
							<div className="my-4 px-5">
								<p className="text-xl font-[500] leading-6">
									Always-On Strategy Companion
								</p>
								<p className="text-alphii_text_sub_600">
									Thinks ahead, plans smartly, and helps you stay one step
									ahead.
								</p>
							</div>
						</div>
					</div>
					<div>
						<div className="flex flex-col gap-6 justify-between">
							<div className="bg-[#F9F9FB] rounded-[16px] overflow-hidden">
								<Image
									src={"/images/home-illust-2.png"}
									alt="illust"
									fill
									className="!static !w-full"
								/>
								<div className="my-4 px-5">
									<p className="text-xl font-[500] leading-6">
										Perfect Memory Project Buddy
									</p>
									<p className="text-alphii_text_sub_600">
										Remembers every detail so you can stay focused on what
										matters.
									</p>
								</div>
							</div>
							<div className="bg-[#F9F9FB] rounded-[16px] overflow-hidden">
								<Image
									src={"/images/home-illust-3.png"}
									alt="illust"
									fill
									className="!static !w-full"
								/>
								<div className="my-4 px-5">
									<p className="text-xl font-[500] leading-6">
										Teammate That Just Knows
									</p>
									<p className="text-alphii_text_sub_600">
										Understands your flow, follows your lead, and helps you move
										fast.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="flex flex-col gap-6 justify-between">
							<div className="bg-[#F9F9FB] rounded-[16px] overflow-hidden">
								<Image
									src={"/images/home-illust-4.png"}
									alt="illust"
									fill
									className="!static !w-full"
								/>
								<div className="my-4 px-5">
									<p className="text-xl font-[500] leading-6">
										Perfect Memory Project Buddy
									</p>
									<p className="text-alphii_text_sub_600">
										Remembers every detail so you can stay focused on what
										matters.
									</p>
								</div>
							</div>
							<div className="bg-[#F9F9FB] rounded-[16px] overflow-hidden">
								<Image
									src={"/images/home-illust-5.png"}
									alt="illust"
									fill
									className="!static !w-full"
								/>
								<div className="my-4 px-5">
									<p className="text-xl font-[500] leading-6">
										{"You're in the loop"}
									</p>
									<p className="text-alphii_text_sub_600">
										{`With everything visible you can join in, observe because
										it's your team too.`}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<p className="text-alphii_text_sub_600 mt-[60px]">
					Understands your flow, follows your lead, and helps you move fast.
				</p>
			</div>

			<div className="w-full relative  max-w-[1250px] flex-col flex items-center  justify-center bg-center px-4 md:px-8 md:pb-[100px] lg:px-[60px] pt-[60px]">
				<div className="flex w-full items-start flex-col gap-[100px]">
					<p className="text-[32px]">
						What makes us special{" "}
						<span className="text-alphii_text_sub_600">
							from other products
						</span>
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10 container1">
						<div className="flex group flex-col gap-6 justify-between items-start">
							<Template className="group-hover:text-primary transition-colors text-[#81828D]" />
							<p className="text-xl">
								Start fast or make it yours.{" "}
								<span className="text-[#81828D]">
									Pick a team template to get started or make one from scratch,
									fully customisable.
								</span>
							</p>
						</div>
						<div className="flex group flex-col gap-6 justify-between items-start">
							<DoubleRobots className="group-hover:text-primary transition-colors text-[#81828D]" />
							<p className="text-xl">
								Agents that talk to agents.{" "}
								<span className="text-[#81828D]">
									Your agents sync, share context, and collaborate seamlessly
									just like a real team.
								</span>
							</p>
						</div>
						<div className="flex group flex-col gap-6 justify-between items-start">
							<Punch className="group-hover:text-primary transition-colors text-[#81828D]" />
							<p className="text-xl">
								{"You're part of the loop."}{" "}
								<span className="text-[#81828D]">
									{`With everything visible you can join in, guide, or simply
									observe because it's your team too.`}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full relative bg-alphii_bg_weak_40 flex-col flex items-center  justify-center bg-center px-4 md:px-8 lg:pb-[100px] lg:px-[60px] pt-[100px]">
				<p className="text-[32px] font-[500] text-center">
					<span className="text-alphii_text_sub_600">
						Start by choosing a template, or
					</span>
					<br />
					create your own fully customizable agent-to-agent team
				</p>

				<div className="mt-[60px]">
					<DirectionAwareTabs
						tabs={tabs}
						className="max-w-[673px] px-10 mx-auto pb-0 mb-0 flex-wrap"
					/>
				</div>

				<div className="w-full max-w-6xl mx-auto p-4 mt-[120px]">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-[120px] gap-y-10">
						<div className=" border-blue-500 p-6 rounded">
							<h2 className="text-lg font-medium text-primary mb-2">
								Trained Only. Tracked Never. Yours Always.
							</h2>
							<p className="text-gray-600">
								{`Your data powers your agents — and nothing else. Private,
								encrypted, and used only to train what's yours.`}
							</p>
						</div>

						<div className=" border-blue-500 p-6 rounded">
							<h2 className="text-lg font-medium text-primary mb-2">
								{"Pricing That Fits. Nothing You Don't."}
							</h2>
							<p className="text-gray-600">
								Flexible plans for every size team. Start small or scale up —
								only pay for what you actually use.
							</p>
						</div>

						<div className=" border-blue-500 p-6 rounded">
							<h2 className="text-lg font-medium text-primary mb-2">
								So Simple It Just Makes Sense.
							</h2>
							<p className="text-gray-600">
								No steep learning curve. Just intuitive tools that let your
								agents work like teammates — fast, fluid, friendly.
							</p>
						</div>

						<div className=" border-blue-500 p-6 rounded">
							<h2 className="text-lg font-medium text-primary mb-2">
								See It Talk. Watch It Think.
							</h2>
							<p className="text-gray-600">
								Agents respond like real teammates. Chat, delegate, collaborate
								— all in natural language, all in real time.
							</p>
						</div>

						<div className=" border-blue-500 p-6 rounded">
							<h2 className="text-lg font-medium text-primary mb-2">
								Customize It. Train It. Own It.
							</h2>
							<p className="text-gray-600">
								Drop in your knowledge base, and your agent adapts. Personalized
								smarts, built right into the workflow.
							</p>
						</div>

						<div className=" border-blue-500 p-6 rounded">
							<h2 className="text-lg font-medium text-primary mb-2">
								Knows The Job. Never Takes Breaks.
							</h2>
							<p className="text-gray-600">
								{`Like your best coworker — but tireless. Agents remember, learn,
								and act like they've always been on the team.`}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className=" px-4 md:px-8 lg:px-[150px] py-12 md:py-[100px] text-black dark:text-white">
				<div className="mt-[100px] ">
					<p className="text-[44px] leading-[52px] font-bold">Our Pricing</p>
					<p className="text-xl leading-7 text-alphii_text_sub_600">
						Incredibly powerful, yet simply affordable.
					</p>

					<div className="mt-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<PriceCard variant="basic" />
						<PriceCard variant="plus+" />
						<PriceCard variant="custom" />
					</div>
				</div>
				<div className="mt-[60px] md:mt-[100px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[60px]">
					<div>
						<p className="text-3xl md:text-4xl lg:text-[44px] leading-tight lg:leading-[52px] font-bold">
							Frequently Asked Questions
						</p>
						<p className="text-lg md:text-xl leading-7 text-alphii_text_sub_600 mt-4">
							Incredibly powerful, yet simply affordable.
						</p>
					</div>
					<FAQs />
				</div>
			</div>
			<div className="p-5 ">
				<div className="bg-black dark:bg-card text-white rounded-3xl px-4 md:px-8 lg:px-10 py-14  ">
					<div className="w-full items-center flex flex-col">
						<Logo className="text-background" />
						<p className="mt-5 text-3xl">
							Build wonders with your <br /> customisable A2A team
						</p>
						<Link href={Routes.LOGIN}>
							<Button className="items-center gap-2 mt-5 w-fit">
								{translation("lGetStartedForFree")} <ArrowUpRight />
							</Button>
						</Link>
					</div>
					<div className="mt-[60px]">
						<div className="flex flex-wrap gap-10 justify-between items-center">
							<div>
								<p className="bg-[linear-gradient(90deg,#777E90_0%,#FFFFFF_31.12%,#777E91_62.25%)] bg-clip-text text-transparent font-bold text-[28px] leading-8">
									Exclusive Beta Coming Q1 2025
								</p>
								<p className="text-alphii_text_sub_600 mt-3">
									{`Don't miss your chance to be part of something new. Join our
									closed beta today.`}
								</p>
							</div>
							<div className="flex gap-2 flex-wrap">
								<Input
									placeholder="0x25@alphiiai.com"
									className="w-[224px] h-12 rounded-xl bg-transparent border-[#23262F]"
								/>
								<Button className="  hover: h-12" variant="ghost">
									Join the waitlist
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-10 lg:grid-cols-2 mt-8 text-xs lg:gap-[60px] text-alphii_text_sub_600">
							<p>
								{`Alphii AI is an emerging startup proudly built in Vietnam. As we
								continue to grow, we're actively developing and refining our
								technology. Some features showcased may still be in early access
								or under development. The full feature set will be released in
								accordance with our public roadmap, and we're working hard to
								deliver everything very soon. Thank you for your patience and
								support as we build something ambitious and useful, together.`}
							</p>
							<div className="flex flex-col gap-2.5">
								<p>
									[1] Alphii AI is a Vietnam-based startup currently in active
									development.
								</p>
								<p>
									[2] Some features are experimental or pre-release and may
									change as we progress.
								</p>
								<p>
									[3] Full feature rollout is coming soon as we follow the
									roadmap.
								</p>
							</div>
						</div>
					</div>
					<div className="mt-[60px] flex sm:flex-row gap-10 flex-col items-end sm:items-center justify-between border-t border-[#23262F] py-4">
						<div className="flex justify-between sm:justify-start sm:gap-10 items-center w-full">
							<p>Alphii AI ©️ 2025</p>
							<p>Terms and Conditions</p>
							<p>Privacy Policy</p>
						</div>
						<div className="flex gap-3 items-center">
							<Twitter />
							<Linkedin />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
