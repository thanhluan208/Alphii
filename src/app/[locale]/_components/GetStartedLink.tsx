"use client"

import React from "react"

import { Link } from "@/i18n/routing"
import { Routes } from "@/lib/constant"

import useUserStore from "@/stores/user.store"

const GetStartedLink = ({ children }: { children: React.ReactNode }) => {
	const { user_id } = useUserStore((state) => state.profile) || {}

	return <Link href={user_id ? Routes.PROJECT : Routes.LOGIN}>{children}</Link>
}

export default GetStartedLink
