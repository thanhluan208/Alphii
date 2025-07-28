import { useTranslations } from "next-intl"
import Image from "next/image"

import { ArrowUpRight, Document, Logo } from "@/components/icons"
import { Button } from "@/components/ui"
import { SmoothLink } from "@/components/ui/smooth-link"
import { Link } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { ArrowUp, Plus } from "lucide-react"

import useUserStore from "@/stores/user.store"

import FAQs from "./_components/FAQs"
import GetStartedLink from "./_components/GetStartedLink"
import HomeInput from "./_components/HomeInput"
import MobileMenu from "./_components/MobileMenu"
import PriceCard from "./_components/PriceCard"
import TabList from "./_components/TabList"

const HomePage = () => {
	const translation = useTranslations("home")

	return (
		<div
			id="home"
			className="bg-[#FCFCFD] px-5 pb-20 text-[#1E1F24] overflow-x-hidden h-screen w-screen max-h-screen overflow-y-auto relative"
		>
			<div className="relative p-5 flex items-center justify-between z-10">
				<Logo />
				<div className="flex gap-2">
					<div className="md:flex hidden">
						<SmoothLink
							className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
							href="#feature"
						>
							{translation("feature")}
						</SmoothLink>
						<SmoothLink
							className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
							href="#documents"
						>
							{translation("documents")}
						</SmoothLink>
						<SmoothLink
							className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
							href="#how-it-work"
						>
							{translation("howItWorks")}
						</SmoothLink>
						<SmoothLink
							className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
							href="#pricing"
						>
							{translation("pricing")}
						</SmoothLink>
						<SmoothLink
							className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
							href="#faqs"
						>
							{translation("faqs")}
						</SmoothLink>
					</div>
					<GetStartedLink>
						<Button className="w-[124px] h-9 border-2 border-[#4100B1] rounded-full">
							{translation("getStarted")} <ArrowUpRight />
						</Button>
					</GetStartedLink>
					<MobileMenu />
				</div>
			</div>
			<div
				className="absolute !top-0 !left-2/4 -translate-x-2/4"
				style={{
					mask: "radial-gradient(90% 70% at 50% 40%, rgba(0, 0, 0, 0.99) 40%, rgba(0, 0, 0, 0) 70%)"
				}}
			>
				<Image
					priority
					alt="hero"
					src="/images/home/hero-bg.webp"
					fill
					sizes="100%"
					className="!relative !w-[1360px] lg:!w-screen lg:!max-w-[100vw] !max-w-[1360px] !h-auto"
				/>

				<div className="absolute top-0 left-0 " />
			</div>
			<div className="relative z-10 mt-20 text-center flex items-center justify-center flex-col">
				<p className="text-3xl md:text-5xl font-medium max-w-[483px]">
					{translation("heroTitle")}
				</p>
				<p className="mt-5 w-[335px] md:w-[563px]">
					{translation("heroDescription")}
				</p>
			</div>
			<div className="flex items-center justify-center relative mt-14  ">
				<div className="bg-[linear-gradient(108.45deg,rgba(255,255,255,0.35)_0.88%,#FFFFFF_48.8%,rgba(255,255,255,0.12)_96.73%)] p-[1.18px] rounded-2xl flex items-center justify-center">
					<Image
						src="/images/home/hero-code-bg.png"
						alt="code"
						fill
						priority
						sizes="100%"
						className="!w-[316.88px] xs:!w-[400px] rounded-xl object-fill opacity-50  md:!w-[706px]  !relative z-10 !h-auto"
					/>
				</div>
				<div className="absolute blur-[55px] h-[120px] md:h-[160px] bottom-5 max-w-[770px] w-[calc(100vw-32px)] bg-[conic-gradient(from_90deg_at_50%_50%,#A79CFF_0deg,#FA96FF_72deg,#FFE188_144deg,#24FFA0_216deg,#00DDF1_288deg,#A79CFF_360deg)]" />
				<div className="bg-[linear-gradient(90deg,#A79CFF_0%,#F0EAFE_50%,#D6A7FF_100%)] max-w-[770px] absolute bottom-2.5 w-[calc(100vw-32px)] h-[120px] md:h-[160px] z-[11] rounded-[18px] border-[0.89px] border-[#0000001F] shadow-2xl p-[1.78px]">
					<HomeInput />
				</div>
			</div>
			<div className="mt-20 px-6 w-full mx-auto max-w-[648px] overflow-x-hidden">
				<section id="documents">
					<p className={cn("text-3xl font-medium")}>
						{translation("documentsTitle")}
					</p>
					<p className="text-sm font-medium text-[#62636C] mt-5">
						{translation("documentsDescription")}
					</p>

					<div className="mt-10 flex gap-2 flex-wrap ">
						<GetStartedLink>
							<Button className="w-[124px] h-11 border-2 border-[#4100B1] rounded-full">
								{translation("getStarted")} <ArrowUpRight />
							</Button>
						</GetStartedLink>
						<button className="px-2 font-medium pl-3 py-2.5 border border-[#EFF0F3] rounded-full flex items-center gap-2">
							{translation("documentation")}
							<Document />
						</button>
						<div className="w-full flex justify-end">
							<Image
								src="/images/home/home-bg.png"
								alt="home"
								width={282}
								height={188}
							/>
						</div>
					</div>
				</section>

				<div className="my-14 border-t-[4px] border-dashed border-[#E0E1E6]" />

				<section id="how-it-work">
					<p className="text-3xl">{translation("howItWorksTitle")}</p>
					<p className="text-sm font-medium text-[#62636C] mt-5">
						{translation("howItWorksDescription")}
					</p>

					<div className="pl-5 relative mt-11">
						<div className="pl-10 pb-5 relative border-l border-dashed border-[#E0E1E6]">
							<p className="text-2xl font-medium">
								{translation("step1Title")}
							</p>
							<p className="text-sm font-medium text-[#62636C] mt-2">
								{translation("step1Description")}
							</p>
							<div className="w-10 h-10 font-medium text-white flex items-center justify-center rounded-full absolute top-0 -left-5 bg-[#005DE8] border-2 border-[#0000001F]">
								1
							</div>
						</div>
						<div className="pl-10 pb-5 relative border-l border-dashed border-[#E0E1E6]">
							<p className="text-2xl font-medium">
								{translation("step2Title")}
							</p>
							<p className="text-sm font-medium text-[#62636C] mt-2">
								{translation("step2Description")}
							</p>
							<div className="w-10 h-10 font-medium text-white flex items-center justify-center rounded-full absolute top-0 -left-5 bg-[#005DE8] border-2 border-[#0000001F]">
								2
							</div>
						</div>
						<div className="pl-10 pb-5 relative ">
							<p className="text-2xl font-medium">
								{translation("step3Title")}
							</p>
							<p className="text-sm font-medium text-[#62636C] mt-2">
								{translation("step3Description")}
							</p>
							<div className="w-10 h-10 font-medium text-white flex items-center justify-center rounded-full absolute top-0 -left-5 bg-[#005DE8] border-2 border-[#0000001F]">
								3
							</div>
						</div>
					</div>
				</section>

				<div className="my-14 border-t-[4px] border-dashed border-[#E0E1E6]" />

				<section id="feature">
					<p className="text-3xl font-medium">{translation("featureTitle")}</p>

					<TabList />
				</section>

				<div className="my-14 border-t-[4px] border-dashed border-[#E0E1E6]" />

				<section id="pricing">
					<p className="text-3xl font-medium">{translation("pricingTitle")}</p>

					<p className=" font-medium text-[#62636C] mt-5">
						{translation("pricingDescription")}
					</p>

					<div className="max-w-full pb-14 overflow-x-auto no-scrollbar">
						<div className="mt-5 md:gap-10 items-center flex gap-2.5 w-[920px] md:w-full md:flex-col">
							<PriceCard type="basic" />
							<PriceCard type="plus" />
							<PriceCard type="custom" />
						</div>
					</div>
				</section>

				<div className="mb-14 border-t-[4px] border-dashed border-[#E0E1E6]" />

				<section id="faqs">
					<p className="text-3xl font-medium">{translation("faqsTitle")}</p>

					<div className="px-3 py-2.5 mt-5 rounded-2xl bg-[#F8F8FF] flex items-center gap-4">
						<div className="w-[5px] h-10 rounded-full bg-primary" />
						<p className="text-sm font-medium">
							{translation("contactEmailText")}{" "}
							<a href={`mailto:${translation("contactEmail")}`}>
								{translation("contactEmail")}
							</a>
						</p>
					</div>

					<FAQs />
				</section>
			</div>
			<div className="mt-16 relative w-full max-w-[800px] border-2 border-[#EFF0F3] rounded-[40px] overflow-hidden mx-auto p-8">
				<Image
					src="/images/home/hero-bg.webp"
					alt="hero-bg"
					fill
					sizes="100vw"
					className="!top-2/4 !left-2/4 !-translate-x-2/4 !-translate-y-2/4"
				/>
				<div className="relative z-10 max-w-[400px] flex flex-col gap-20">
					<p className="md:text-5xl text-3xl font-medium">
						{translation("ctaTitle")}
					</p>
					<div className="flex gap-2">
						<GetStartedLink>
							<Button className="w-[124px] h-11 border-2 border-[#4100B1] rounded-full">
								{translation("getStarted")} <ArrowUpRight />
							</Button>
						</GetStartedLink>
						<button className="px-2 bg-white font-medium pl-3 py-2.5 border border-[#EFF0F3] rounded-full flex items-center gap-2">
							{translation("documentation")}
							<Document />
						</button>
					</div>
				</div>

				<Image
					src="/images/home/home-bg.png"
					fill
					alt="team"
					sizes="100%"
					className="!bottom-0 hidden md:block !w-2/4 !h-auto !absolute !top-[unset] !left-[unset] !right-0"
				/>
			</div>

			<div className="mx-auto max-w-[426px] mt-20 gap-2.5  font-medium text-[10px] sm:text-xs md:text-sm flex flex-col items-center justify-center">
				<Logo />
				<div className="flex">
					<SmoothLink
						className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
						href="#feature"
					>
						{translation("feature")}
					</SmoothLink>
					<SmoothLink
						className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
						href="#documents"
					>
						{translation("documents")}
					</SmoothLink>
					<SmoothLink
						className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
						href="#how-it-work"
					>
						{translation("howItWorks")}
					</SmoothLink>
					<SmoothLink
						className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
						href="#pricing"
					>
						{translation("pricing")}
					</SmoothLink>
					<SmoothLink
						className="hover:text-primary px-2.5 py-1 flex items-center justify-center"
						href="#faqs"
					>
						{translation("faqs")}
					</SmoothLink>
				</div>
			</div>

			<p className="text-center mt-10 text-[#62636C]">
				{translation("allRightsReserved")}
			</p>
		</div>
	)
}

export default HomePage
