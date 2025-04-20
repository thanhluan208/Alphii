import { useTranslations } from "next-intl"
import Image from "next/image"

import {
	CodeIcon,
	Document,
	DoubleChevronRight,
	Linkedin,
	RoleBase,
	Security,
	StoreDataIcon,
	Twitter
} from "@/components/icons"
import { Button } from "@/components/ui"
import { CardStack } from "@/components/ui/card-stack"
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-card"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { ArrowUp, Check } from "lucide-react"
import { v4 as uuid } from "uuid"

import Demos from "./_components/Demos"
import FAQs from "./_components/FAQs"
import FavorCard from "./_components/FavorCard"
import PriceCard from "./_components/PriceCard"

const Home = () => {
	const translation = useTranslations("home")

	const favorCards = [
		{
			index: 1,
			title: "Agents that actually work",
			description:
				"They don’t just run prompts. They plan, adapt, and deliver results—on their own."
		},
		{
			index: 2,
			title: "Teams build faster together",
			description:
				"Workflows stay in sync. Agents share context and collaborate, just like your team would."
		},
		{
			index: 3,
			title: "Built-in security, no add-ons",
			description:
				"Encryption, access control, and private deployment come standard. No hidden extras."
		},
		{
			index: 4,
			title: "Real-time collaboration",
			description:
				"See what agents are doing, make changes instantly, and stay in the loop effortlessly."
		},
		{
			index: 5,
			title: "No black boxes—full visibility",
			description:
				"Every step is logged. Every decision traceable. Total transparency, by default."
		},
		{
			index: 6,
			title: "Set it up once, it runs itself",
			description:
				"Launch an agent and let it go. It works around the clock—no babysitting needed."
		}
	]

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
		<div className="relative text-white bg-[#0A0812]">
			<div className="fixed top-0 left-0 flex items-center justify-between w-full h-[80px] bg-[#0404068C] z-10 px-4 md:px-8 lg:px-[150px] py-5 backdrop-blur-md">
				<div className="flex items-center gap-[60px]">
					<Image
						src={"/images/logo.png"}
						alt="logo"
						width={86}
						height={23.71}
					/>
					<div className="hidden md:flex gap-6 items-center">
						<Link href={"#feature"}>{translation("lFeature")}</Link>
						<Link href={"#about"}>{translation("lHowItWork")}</Link>
						<Link href={"#roadmap"}>{translation("lTestimonials")}</Link>
						<Link href={"#team"}>{translation("lPricing")}</Link>
						<Link href={"#faq"}>{translation("lFAQs")}</Link>
					</div>
				</div>
				<Button
					className="bg-white hover:bg-white text-black h-10 w-[109px] rounded-[10px]"
					variant="ghost"
				>
					{translation("lGetStarted")}
				</Button>
			</div>
			<div className="w-full bg-[url(/images/home-sec-1.jpeg)] bg-center bg-cover px-4 md:px-8 lg:px-[150px] pt-[80px]">
				<div className="pt-[240px] pb-[100px] border-x border-[#FFFFFF1A]">
					<div className="px-10 flex flex-col gap-[60px]">
						<div className="p-1.5 pl-3 flex items-center gap-2 rounded-[10px] backdrop-blur-md bg-[#00000033] w-fit">
							<p>{translation("lLaunch")}</p>
							<div className="bg-[#00000059] py-1 px-2.5 flex items-center gap-0.5 rounded-md">
								<p>{translation("lLearnMore")}</p>
								<ArrowUp className="rotate-45 h-4 w-4" />
							</div>
						</div>
						<div>
							<div className="w-full max-w-[1060px] h-auto md:h-[144px] not-italic font-medium text-4xl md:text-5xl lg:text-[64px] leading-tight md:leading-[72px] tracking-[-0.03em] bg-gradient-to-r from-[#D0D0D0] via-[#ECECEC] to-[#D0D0D0] bg-clip-text text-transparent mix-blend-color-dodge whitespace-pre-line">
								{translation("lPowerUp")}
							</div>
							<p className="text-xl leading-7 whitespace-pre-line mt-5">
								{translation("lCreate")}
							</p>
						</div>
						<div className="flex gap-4 items-center flex-wrap">
							<Button>
								{translation("lGetStartedForFree")} <DoubleChevronRight />
							</Button>
							<Button
								className="h-12 bg-[#00000033] hover:[#00000033] border-2 border-[#FFFFFF1F] rounded-lg"
								variant={"ghost"}
							>
								{translation("lDocumentation")}
								<Document className="text-[#EFF0F3]" />
							</Button>
							<div className="gap-2 flex items-center">
								<p>✢</p>
								<p>{translation("lTrial")}</p>
								<p>✢</p>
							</div>
						</div>
						<div className="flex items-center justify-center p-6 flex-col gap-10">
							<Image
								fill
								alt="code"
								src={"/images/home-code.png"}
								className="w-full !static"
							/>
							<div className="max-w-[100%]">
								<p className="text-center">{translation("lLaunch")}</p>
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
					</div>
				</div>
			</div>
			<div className="bg-[linear-gradient(180deg,#140D22_0%,#0A0812_100%)] border-t border-[#FFFFFF1A] px-4 md:px-8 lg:px-[150px] py-12 md:py-[100px] grid grid-cols-1 md:grid-cols-2 gap-10">
				<div className="col-span-1">
					<p className="text-primary uppercase">
						{"//"} {translation("lWhy")} Alphii AI
					</p>
					<p className="mt-6 whitespace-pre-line text-[44px] leading-[52px]">
						{translation("lBuildForTrust")}
					</p>
				</div>
				<div className="col-span-1 py-6 flex flex-col gap-[60px]">
					<div>
						<div className="flex gap-2.5 items-center">
							<Security />
							<p className="text-xl">{translation("lSecurity")}</p>
						</div>
						<p className="mt-3">{translation("msgSecurity")}</p>
					</div>
					<div>
						<div className="flex gap-2.5 items-center">
							<RoleBase />
							<p className="text-xl">{translation("lRoleBase")}</p>
						</div>
						<p className="mt-3">{translation("msgRoleBase")}</p>
					</div>
					<div>
						<div className="flex gap-2.5 items-center">
							<StoreDataIcon />
							<p className="text-xl">{translation("lStoreData")}</p>
						</div>
						<p className="mt-3">{translation("msgStoreData")}</p>
					</div>
				</div>
			</div>
			<div
				className={cn(
					"px-4",
					"bg-[#F9F9FB] lg:px-[150px] py-[100px] text-[#1E1F24]"
				)}
			>
				<div className="flex flex-col gap-6">
					<p className="text-primary uppercase">
						{"//"} {translation("lWhy")} Alphii AI
					</p>
					<p className="font-[500] text-[44px] whitespace-pre-line leading-[52px]">
						{translation("lPowerUp")}
					</p>
					<p className="whitespace-pre-line text-xl">
						{translation("lNotBot")}
					</p>
				</div>
				<div
					className={cn("grid-cols-1", "mt-[60px] grid sm:grid-cols-3 gap-6")}
				>
					<div className="col-span-1">
						<div className="rounded-[32px] overflow-hidden border border-[#E7E8EC]">
							<div className="h-11 w-full flex items-center justify-center bg-[url('/images/home-line-header.png')] bg-center bg-cover">
								<p>✢ {translation("lAlwayOn")} ✢</p>
							</div>
							<div className="p-6">
								<p className="text-2xl font-bold ">
									{translation("lNeverSleep")}
								</p>
								<p className="mt-2.5 text-[18px]">
									{translation("msgNeverSleep")}
								</p>
							</div>
							<Image
								src={"/images/home-nosleep.png"}
								alt="code"
								fill
								className="!w-full !static object-cover object-center !h-auto"
							/>
						</div>
					</div>
					<div className="col-span-1 sm:pt-[140px]">
						<div className="rounded-[32px] overflow-hidden border border-[#E7E8EC]">
							<div className="h-11 w-full flex items-center justify-center bg-[url('/images/home-line-header.png')] bg-center bg-cover">
								<p>✢ {translation("lActLikeManager")} ✢</p>
							</div>
							<div className="p-6">
								<p className="text-2xl font-bold ">
									{translation("lLikeManager")}
								</p>
								<p className="mt-2.5 text-[18px]">
									{translation("msgLikeManager")}
								</p>
							</div>
							<Image
								src={"/images/home-manager.png"}
								alt="code"
								fill
								className="!w-full !static object-cover object-center !h-auto"
							/>
						</div>
					</div>
					<div className="col-span-1 sm:pt-[250px]">
						<div className="rounded-[32px] overflow-hidden border border-[#E7E8EC]">
							<div className="h-11 w-full flex items-center justify-center bg-[url('/images/home-line-header.png')] bg-center bg-cover">
								<p>✢ {translation("lUnderstandTeamate")} ✢</p>
							</div>
							<div className="p-6">
								<p className="text-2xl font-bold ">
									{translation("lLikeATeam")}
								</p>
								<p className="mt-2.5 text-[18px]">
									{translation("msgLikeATeam")}
								</p>
							</div>
							<Image
								src={"/images/home-teammate.png"}
								alt="code"
								fill
								className="!w-full !static object-cover object-center !h-auto"
							/>
						</div>
					</div>
				</div>
				<p className="mt-6 text-[14px] text-center">
					{`✢   ${translation("lAssembleEasy")}   ✢`}
				</p>
				<div className="mt-[100px] flex sm:flex-row flex-col sm:gap-[80px] gap-6 items-center">
					<div className="flex-1">
						<p className="text-primary">{`// ALPHI AI AGent teams`}</p>
						<p className="text-[44px] leading-[52px] font-[500] mt-6">
							{translation("lImagine")}
						</p>
					</div>
					<Image
						src={"/images/home-hola.png"}
						alt="code"
						width={272.1301574707031}
						height={148.71661376953125}
					/>
				</div>
				<div className="w-full mt-[60px]">
					<CardStack
						className={cn("h-[320px]", "w-full sm:h-[430px]")}
						items={[
							{
								id: uuid(),
								index: 1,
								title: translation("lCreateListing"),
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan placerat gravida. Aenean malesuada ligula tortor. Curabitur non molestie lectus. Maecenas vel varius nisl. Donec a faucibus justo. Nulla ornare, mauris varius bibendum pharetra, nulla elit pharetra elit, vel fringilla leo erat sit amet purus.",
								image: "/images/home-step.png"
							},
							{
								id: uuid(),
								index: 2,
								title: translation("lCreateListing"),
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan placerat gravida. Aenean malesuada ligula tortor. Curabitur non molestie lectus. Maecenas vel varius nisl. Donec a faucibus justo. Nulla ornare, mauris varius bibendum pharetra, nulla elit pharetra elit, vel fringilla leo erat sit amet purus.",
								image: "/images/home-step.png"
							},
							{
								id: uuid(),
								index: 3,
								title: translation("lCreateListing"),
								description:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan placerat gravida. Aenean malesuada ligula tortor. Curabitur non molestie lectus. Maecenas vel varius nisl. Donec a faucibus justo. Nulla ornare, mauris varius bibendum pharetra, nulla elit pharetra elit, vel fringilla leo erat sit amet purus.",
								image: "/images/home-step.png"
							}
						]}
					/>
				</div>
				<p className="mt-[60px] text-center">✢ {translation("lSimple")} ✢</p>
			</div>
			<div
				className={cn(
					"px-4",
					"bg-[#0A0812] lg:px-[150px] py-[100px] text-white "
				)}
			>
				<div className={cn("grid-cols-1", "grid md:grid-cols-2 gap-[60px]")}>
					<div className="col-span-1 flex flex-col justify-between">
						<div className="flex flex-col gap-6">
							<p className="text-primary uppercase">
								{`// ${translation("lWhy")} Alphii AI`}
							</p>
							<p className="text-[44px] leading-[52px] font-[500]">
								{translation("lExplore")}
							</p>
							<p className="text-2xl leading-9">
								<span className="text-[#80828D]">
									{translation("msgExplore1")}
								</span>
								<span className="bg-[#80828D]/20 pl-2 rounded-lg text-primary pt-1 mr-2">
									{translation("lFromSoftware")}
								</span>
								<span className="text-[#80828D]">
									{translation("lToDigital")}
								</span>
								<span className="text-[#80828D]">
									{translation("lToOfficeTask")}
								</span>
								<span className="text-[#80828D]">
									{translation("msgExplore2")}
								</span>
							</p>
						</div>
						<div className="flex gap-3 items-center">
							<CodeIcon />
							<p className="w-[494px] mt-2 flex items-center font-medium text-[16px] leading-[24px] tracking-[-0.01em] bg-gradient-to-r from-[#7D7B85] via-[#D2D1D3] to-[#7D7B85] bg-clip-text text-transparent">
								Code & Develop Software Applications in any language you
								request.
							</p>
						</div>
					</div>

					<div
						className={cn(
							"col-span-1 relative z-0 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[34px] before:p-[2px] before:bg-[linear-gradient(156.1deg,#896FDF_3.87%,rgba(137,111,223,0.3)_84.65%)]",
							"rounded-[32px] p-0.5 "
						)}
					>
						<div className="w-full h-full bg-[linear-gradient(162.24deg,#221C3A_0.05%,rgba(10,8,18,0.9)_87.87%)] rounded-[32px] p-5">
							<div className="flex items-center gap-4">
								<div className="h-11 w-11 flex items-center justify-center rounded-lg bg-[#F7B6BD]">
									<Image
										src={"/images/agents/bob.png"}
										alt="bob"
										width={40}
										height={40}
									/>
								</div>
								<p className="text-[18px]">Bob - Software Developer Agent</p>
							</div>

							<div className="mt-7 w-full max-h-[415px] overflow-hidden">
								<Image
									src={"/images/home-code-bob.png"}
									alt="code"
									fill
									className="!w-full !static !h-[495px]"
								/>
							</div>
						</div>
						<div className="absolute w-[calc(100%-4px)] left-0.5 bottom-0.5 rounded-b-[32px] h-[358px] bg-[linear-gradient(180deg,rgba(33,29,54,0)_0%,#211D36_91.04%)] z-10" />
					</div>
				</div>
				<div className="mt-[100px]">
					<div className="flex flex-col gap-6">
						<p className="text-primary text-sm">{`// ALPHII AI DEMO`}</p>
						<p className="text-[44px] leading-[52px] font-[500] whitespace-pre-line">
							{translation("lGetStartedRightNow")}
						</p>
						<p className="text-xl text-[#62636C]">
							{translation("msgGetStartedRightNow")}
						</p>
					</div>
				</div>
			</div>
			<div className="bg-[#0A0812] -translate-y-[1px]">
				<DirectionAwareTabs
					tabs={tabs}
					className={cn("px-2 w-full", "sm:px-[100px] sm:w-[164px] h-10")}
				/>
			</div>
			<div
				className={cn(
					"px-4",
					"lg:px-[150px] py-[100px] bg-[url('/images/home-compare.png')] h-[976px] w-full bg-center bg-cover"
				)}
			>
				<div className="flex flex-col gap-6">
					<p className="text-primary uppercase">
						{"//"} {translation("lWhy")} Alphii AI
					</p>
					<p className="font-[500] text-[44px] whitespace-pre-line leading-[52px]">
						{translation("lPowerUp")}
					</p>
					<p className="text-xl text-[#62636C]">{translation("lTransform")}</p>
				</div>
				<div className="mt-[60px] grid grid-cols-2 border-2 border-[#FFFFFF14] rounded-[32px] gap-3 sm:gap-10 p-4 bg-[#0A0812]">
					<div className="col-span-1 p-8 flex flex-col gap-[60px]">
						<p className={cn("text-xl", "sm:text-[28px] font-[500] leading-8")}>
							{translation("lOthers")}
						</p>
						<div>
							<p className="text-sm font-semibold">
								{translation("lForPersonal")}
							</p>
							<div className="mt-6 flex flex-col gap-3">
								<div className="h-9 w-full flex items-center gap-2.5">
									<div className="w-9 h-9 flex justify-center items-center">
										<Check className="text-[#06BF78]" />
									</div>
									<p>No Customization</p>
								</div>
								<div className="h-9 w-full flex items-center gap-2.5">
									<div className="w-9 h-9 flex justify-center items-center">
										<Check className="text-[#06BF78]" />
									</div>
									<p>No Customization</p>
								</div>
								<div className="h-9 w-full flex items-center gap-2.5">
									<div className="w-9 h-9 flex justify-center items-center">
										<Check className="text-[#06BF78]" />
									</div>
									<p>No Customization</p>
								</div>
								<div className="h-9 w-full flex items-center gap-2.5">
									<div className="w-9 h-9 flex justify-center items-center">
										<Check className="text-[#06BF78]" />
									</div>
									<p>No Customization</p>
								</div>
								<div className="h-9 w-full flex items-center gap-2.5">
									<div className="w-9 h-9 flex justify-center items-center">
										<Check className="text-[#06BF78]" />
									</div>
									<p>No Customization</p>
								</div>
							</div>
						</div>
					</div>
					<div
						className={cn(
							"col-span-1 relative z-0 before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[34px] before:p-[2px] before:bg-[linear-gradient(156.1deg,#896FDF_3.87%,rgba(137,111,223,0.3)_84.65%)]",
							"rounded-[32px] p-[1px]"
						)}
					>
						<div className="w-full h-full p-8 bg-[linear-gradient(162.24deg,#221C3A_0.05%,rgba(10,8,18,0.9)_87.87%)] flex flex-col gap-[60px] rounded-[34px]">
							<p
								className={cn("text-xl", "sm:text-[28px] font-[500] leading-8")}
							>
								{translation("lOthers")}
							</p>
							<div>
								<p className="text-sm font-semibold">
									{translation("lForPersonal")}
								</p>
								<div className="mt-6 flex flex-col gap-3">
									<div className="h-9 w-full flex items-center gap-2.5">
										<div className="w-9 h-9 flex justify-center items-center">
											<Check className="text-[#06BF78]" />
										</div>
										<p>No Customization</p>
									</div>
									<div className="h-9 w-full flex items-center gap-2.5">
										<div className="w-9 h-9 flex justify-center items-center">
											<Check className="text-[#06BF78]" />
										</div>
										<p>No Customization</p>
									</div>
									<div className="h-9 w-full flex items-center gap-2.5">
										<div className="w-9 h-9 flex justify-center items-center">
											<Check className="text-[#06BF78]" />
										</div>
										<p>No Customization</p>
									</div>
									<div className="h-9 w-full flex items-center gap-2.5">
										<div className="w-9 h-9 flex justify-center items-center">
											<Check className="text-[#06BF78]" />
										</div>
										<p>No Customization</p>
									</div>
									<div className="h-9 w-full flex items-center gap-2.5">
										<div className="w-9 h-9 flex justify-center items-center">
											<Check className="text-[#06BF78]" />
										</div>
										<p>No Customization</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white px-4 md:px-8 lg:px-[150px] py-12 md:py-[100px] text-[#1E1F24]">
				<p className="text-[44px] leading-[52px] font-bold">
					Why our customer loves us
				</p>
				<p className="text-xl leading-7 text-[#62636C]">
					{`Transform your customer's journey into a seamless experience.`}
				</p>

				<div className="mt-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{favorCards.map((card, index) => (
						<FavorCard
							key={card.title}
							index={index + 1}
							description={card.description}
							title={card.title}
						/>
					))}
				</div>

				<div className="mt-[100px] ">
					<p className="text-[44px] leading-[52px] font-bold">Our Pricing</p>
					<p className="text-xl leading-7 text-[#62636C]">
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
						<p className="text-lg md:text-xl leading-7 text-[#62636C] mt-4">
							Incredibly powerful, yet simply affordable.
						</p>
					</div>
					<FAQs />
				</div>
			</div>
			<div className="bg-[#0A0812] px-4 md:px-8 lg:px-[150px] py-12 md:py-[100px] text-white">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#62636C]">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
						voluptates repellendus rem laudantium et impedit repellat, ipsum ad
						id dignissimos hic velit eligendi cum assumenda exercitationem sit!
						Provident, qui asperiores. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Consectetur adipisci commodi nisi expedita
						asperiores facilis ab dolor beatae quibusdam at, recusandae officia
						modi, ea aspernatur? Voluptate voluptatibus culpa hic reiciendis.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
						voluptates repellendus rem laudantium et impedit repellat, ipsum ad
						id dignissimos hic velit eligendi cum assumenda exercitationem sit!
						Provident, qui asperiores. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Consectetur adipisci commodi nisi expedita
						asperiores facilis ab dolor beatae quibusdam at, recusandae officia
						modi, ea aspernatur? Voluptate voluptatibus culpa hic reiciendis.
					</p>
				</div>
				<div className="mt-[60px] flex justify-between items-end">
					<div>
						<Image
							src={"/images/logo.png"}
							alt="logo"
							width={86}
							height={23.71}
						/>
						<p className="text-[40px] mt-10 leading-[48px] font-[500] text-[#62636C]">
							{translation("lPowerUp").split("\n")[0]}
							<br />
							<span className="text-white">
								{translation("lPowerUp").split("\n")[1]}
							</span>
						</p>
					</div>
					<p></p>
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
	)
}

export default Home
