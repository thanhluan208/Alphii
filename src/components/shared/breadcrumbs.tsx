"use client"

import React, { Fragment, useMemo } from "react"
import { useTranslations } from "next-intl"

import { Link, usePathname } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { RoutesInterface } from "@/types"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator
} from "../ui/breadcrumb"
import { NavPages } from "./nav"
import useNavStore from "@/stores/navStore"

const Breadcrumbs = () => {
	const pathname = usePathname()
	const t = useTranslations("layout")
	const breakdcrumbs = useNavStore(state => state.breadcrumbs)


	const [, ...routes] = pathname?.split("/")

	const routeFlatten = useMemo(() => {
		const routes: RoutesInterface[] = []

		const handleFlatten = (arr: RoutesInterface[]) => {
			arr.map((elm) => {
				routes.push(elm)
				if (elm?.childrens) {
					handleFlatten(elm.childrens)
				}
			})
		}

		handleFlatten(NavPages)

		return routes
	}, [])

	return (
		<Breadcrumb>
			<BreadcrumbList className="gap-[5px] font-semibold">
				<BreadcrumbItem className="text-base">
					<Link href={Routes.dashboard}>{t("home")}</Link>
				</BreadcrumbItem>
				{routes?.length > 0 && <BreadcrumbSeparator />}
				{routes?.map((route, index) => {
					let href = ""
					if (index === 0) href = `/${route}`
					else {
						routes.forEach((elm) => (href += `/${elm}`))
					}

					const fixedLabel = routeFlatten.find((page) => page.path === `/${route}`)?.label
					const translatedLabel = fixedLabel ? t(fixedLabel) : ''


					const dynamicLabel = breakdcrumbs[route]
					if(!translatedLabel && !dynamicLabel) return null
					return (
						<Fragment key={route}>
							<BreadcrumbItem className="text-base">
								<Link
									href={href}
									className={cn(index === routes.length - 1 && "text-primary")}
								>
									{translatedLabel || dynamicLabel}
								</Link>
							</BreadcrumbItem>
							{index !== routes.length - 1 && <BreadcrumbSeparator />}
						</Fragment>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default Breadcrumbs
