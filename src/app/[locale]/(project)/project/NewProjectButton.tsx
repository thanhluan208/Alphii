'use client'

import React from "react"
import toast from "react-hot-toast"
import { useTranslations } from "next-intl"

import { SpinIcon } from "@/components/icons"
import { Button } from "@/components/ui"
import { useRouter } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { STATUS_CODE } from "@/types"

import useAuthStore from "@/stores/auth.store"
import useUserStore from "@/stores/user.store"
import useMultiAgentTeamMutation from "@/hooks/MultiAgentTeam/useMATMutation"

const NewProjectButton = () => {
	const translation = useTranslations("project")
	const router = useRouter()
	const { createNewMATSession, createNewMATTeam } = useMultiAgentTeamMutation()
	const setAuthParams = useAuthStore((state) => state.setAuthParams)
	const profile = useUserStore((state) => state.profile)

	const isPending = createNewMATSession.isPending || createNewMATTeam.isPending

	const disableSubmit = isPending 

	const handleSubmit = async () => {
		if (!profile?.user_id) {
			setAuthParams({
				redirectTo: Routes.PROJECT,
				params: {}
			})
			router.push(Routes.LOGIN)
			return
		}

		if (isPending) return
		const responseMatTeam = await createNewMATTeam.mutateAsync({
			categories: ["physics", "funny"],
			mat_description: "",
			mat_name: `mat_id_${new Date().valueOf()}`,
			team_template: "dev_team_enhance_noqa_gen2",
			user_id: profile?.user_id
		})

		if (responseMatTeam.status_code !== STATUS_CODE.SUCCESS) {
			toast.error(responseMatTeam.message)
			return
		}

		const responseMatSession = await createNewMATSession.mutateAsync(
			responseMatTeam.mat_id
		)

		if (responseMatSession.status_code !== STATUS_CODE.SUCCESS) {
			toast.error(responseMatSession.message)
			return
		}

		setAuthParams(null)

		router.push(
			`${Routes.STUDIO}?matId=${responseMatTeam.mat_id}&sessionId=${responseMatSession.session_id}`
		)
	}
	return (
		<Button
			onClick={handleSubmit}
			disabled={disableSubmit}
			className="px-5 py-2 w-fit"
		>
			{isPending ? <SpinIcon /> : translation("newProjectButton")}
		</Button>
	)
}

export default NewProjectButton
