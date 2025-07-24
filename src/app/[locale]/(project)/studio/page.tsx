import React from "react"

import StudioPage from "./components/StudioPage"

export interface StudioParams {
	matId: string
	sessionId: string
}

const page = async ({ searchParams }: { searchParams: StudioParams }) => {
	const { matId, sessionId } = searchParams

	// const matMainPrd = await getMatMainPrd({ matId, sessionId })
	// console.log("mat", matMainPrd)

	return <StudioPage />
}

export default page
