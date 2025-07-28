import React from "react"
import { redirect } from "next/navigation"

import { Routes } from "@/lib/constant"

import StudioPage from "./components/StudioPage"

export interface StudioParams {
	matId: string
	sessionId: string
}

const page = async ({ searchParams }: { searchParams: StudioParams }) => {
	const { matId, sessionId } = searchParams

	// const matMainPrd = await getMatMainPrd({ matId, sessionId })
	// console.log("mat", matMainPrd)
	if (!matId || !sessionId) redirect(Routes.PROJECT)

	return <StudioPage matId={matId} sessionId={sessionId} />
}

export default page
