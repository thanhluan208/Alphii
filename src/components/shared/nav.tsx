"use client"

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

import { Link } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"

import { navConfig } from "@/config"

import Booking from "../icons/Booking"
import Company from "../icons/Company"
import Dashboard from "../icons/Dashboard"
import Passenger from "../icons/Passenger"
import Report from "../icons/Report"
import Role from "../icons/Role"
import Service from "../icons/Service"
import User from "../icons/User"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "../ui/accordion"

export const Nav = () => {
	const pathname = usePathname()
	const t = useTranslations("layout")

	if (!navConfig) return null

	const [, , ...rest] = pathname?.split("/")

	return (
		<nav className="w-full">
			{NavPages.map((page) => {
				if (page.hideOnNav) return
				if (page.hideOnNav) return
				const isActive = `/${rest.join("/")}`.includes(page.path)
				// if (page.childrens) {
				// 	return (
				// 		<Accordion type="single" collapsible key={page.path}>
				// 			<AccordionItem value={page.path} className="border-none">
				// 				<AccordionTrigger className="py-0">
				// 					<div
				// 						className={cn(
				// 							"px-4 py-3 flex items-center gap-3 w-full text-grey-2",
				// 							isActive &&
				// 								"bg-[#E7F6F1] border-l-[5px] text-primary border-primary"
				// 						)}
				// 					>
				// 						{page.icon}
				// 						<p
				// 							className={cn(
				// 								"font-semibold leading-[18px] text-[#3B3B3B]",
				// 								isActive && "text-primary"
				// 							)}
				// 						>
				// 							{t(page.label)}
				// 						</p>
				// 					</div>
				// 				</AccordionTrigger>
				// 				<AccordionContent>
				// 					{page.childrens.map((pageChild) => {
				// 						const childActive = rest.some(
				// 							(elm) => `/${elm}` === pageChild.path
				// 						)
				// 						return (
				// 							<Link
				// 								href={`${page.path}${pageChild.path}`}
				// 								key={pageChild.path}
				// 							>
				// 								<div
				// 									className={cn(
				// 										"px-4 py-3 flex items-center",
				// 										isActive && "bg-[#E7F6F175]",
				// 										childActive && "text-primary"
				// 									)}
				// 								>
				// 									<Dot />
				// 									<p
				// 										className={cn(
				// 											"font-semibold text-base leading-[18px] text-[#3B3B3B]",
				// 											childActive && "text-primary"
				// 										)}
				// 									>
				// 										{t(pageChild.label)}
				// 									</p>
				// 								</div>
				// 							</Link>
				// 						)
				// 					})}
				// 				</AccordionContent>
				// 			</AccordionItem>
				// 		</Accordion>
				// 	)
				// }

				return (
					<Link href={page.path} key={page.path}>
						<div
							className={cn(
								"px-3 py-3 flex items-center gap-2 text-grey-2 w-[266px]",
								isActive &&
									"bg-[#E7F6F1] border-l-[5px] text-primary border-primary"
							)}
						>
							{page.icon}
							<p
								className={cn(
									"font-semibold leading-[18px] text-[#3B3B3B]",
									isActive && "text-primary"
								)}
							>
								{t(page.label)}
							</p>
						</div>
					</Link>
				)
			})}
		</nav>
	)
}

export const NavPages = [
	{
		path: Routes.dashboard,
		label: "dashboard",
		icon: <Dashboard />
	},
	{
		path: Routes.report,
		label: "report",
		icon: <Report />
	},
	{
		path: Routes.rolePermission,
		label: "role",
		icon: <Role />
	},
	{
		path: Routes.newRole,
		label: "newRole",
		icon: <Role />,
		hideOnNav: true
	},
	{
		path: Routes.user,
		label: "userManagement",
		icon: <User />
	},
	{
		path: Routes.passengerManagement,
		label: "passengerManagement",
		icon: <Passenger />
	},
	{
		path: Routes.booking,
		label: "bookingManager",
		icon: <Booking />
	},
	{
		path: Routes.service,
		label: "serviceManager",
		icon: <Service />
	},
	{
		path: Routes.company,
		label: "companyManager",
		icon: <Company />
	},
	{
		path: Routes.booking_details,
		label: "bookingDetails",
		icon: <Company />,
		hideOnNav: true
	},
	{
		path: Routes.newService,
		label: "newService",
		icon: <Company />,
		hideOnNav: true
	},
	{
		path: Routes.newUser,
		label: "newUser",
		icon: <User />,
		hideOnNav: true
	}
]
