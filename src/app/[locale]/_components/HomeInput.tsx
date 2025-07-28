"use client"

import { useEffect, useId, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

import { SpinIcon } from "@/components/icons"
import { usePathname, useRouter } from "@/i18n/routing"
import { QueryKeys, Routes } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { STATUS_CODE } from "@/types"
import { Profile } from "@/types/user.type"
import { useQueryClient } from "@tanstack/react-query"
import { ArrowUp, Plus } from "lucide-react"

import useAuthStore from "@/stores/auth.store"
import useUserStore from "@/stores/user.store"
import useMultiAgentTeamMutation from "@/hooks/MultiAgentTeam/useMATMutation"

const HomeInput = () => {
	const router = useRouter()
	const pathname = usePathname()
	const translation = useTranslations("home")

	const profile = useUserStore((state) => state.profile)
	const { authParams, setAuthParams } = useAuthStore()

	const promptParams = authParams?.params?.prompt

	const [prompt, setPrompt] = useState(promptParams ?? "")

	const { createNewMATSession, createNewMATTeam } = useMultiAgentTeamMutation()

	const isPending = createNewMATSession.isPending || createNewMATTeam.isPending

	const disableSubmit = isPending || !prompt

	const handleSubmit = async () => {
		if (!profile?.user_id) {
			setAuthParams({
				redirectTo: Routes.ROOT,
				params: {
					prompt
				}
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
			`${Routes.STUDIO}?matId=${responseMatTeam.mat_id}&sessionId=${responseMatSession.session_id}&prompt=${prompt}`
		)
	}

	useEffect(() => {
		router.replace(pathname)
	}, [])

	return (
		<div className="h-[114px] md:h-[154px] w-full rounded-[16px] flex justify-between flex-col py-2 bg-[#FFFFFF] border-[0.45px] border-[#E2E2E2]">
			<textarea
				defaultValue={promptParams}
				onChange={(e) => setPrompt(e.target.value)}
				placeholder={translation("placeholderText")}
				className="placeholder:text-[#5B5E6E] h-[60px] md:text-sm md:h-[100px] w-full  !outline-none px-3 text-xs resize-none no-scrollbar bg-transparent"
			/>
			<div className="flex items-center justify-between px-3">
				<button className="rounded-full border flex items-center justify-center border-[#EAEAEA] h-8 w-8">
					<Plus size={14} />
				</button>
				<button
					onClick={handleSubmit}
					disabled={disableSubmit}
					className={cn(
						"rounded-full border flex items-center justify-center border-[#EAEAEA] h-8 w-8",
						disableSubmit && "opacity-50"
					)}
				>
					{isPending ? <SpinIcon color="#000" /> : <ArrowUp size={14} />}
				</button>
			</div>
		</div>
	)
}

export default HomeInput
