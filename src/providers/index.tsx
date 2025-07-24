"use client"

import { ToastBar, Toaster } from "react-hot-toast"

import { cn } from "@/lib/utils"
import { QueryProvider } from "@/providers/queryProvider"
import { Check, X } from "lucide-react"

import "@/helpers/apiHelpers"

import { ComponentPropsWithoutRef, useEffect } from "react"

import { Profile } from "@/types/user.type"

import useUserStore from "@/stores/user.store"

interface ProvidersProps extends ComponentPropsWithoutRef<"div"> {
	userData?: Profile
}

export function Providers({ children, userData }: ProvidersProps) {
	const setProfile = useUserStore((state) => state.setProfileData)

	useEffect(() => {
		if (userData) {
			setProfile(userData)
		}
	}, [setProfile, userData])

	return (
		<QueryProvider>
			{children}
			<Toaster
				gutter={5}
				toastOptions={{
					style: {
						background: "transparent",
						boxShadow: "none",
						height: "54px"
					}
				}}
			>
				{(t) => (
					<ToastBar toast={t}>
						{(props) => {
							const { icon, message } = props
							return (
								<div
									className={cn(
										"w-[307px] h-[54px] rounded-lg text-white flex font-semibold relative justify-center items-center",
										t.type === "error" && "bg-[#B80704]",
										t.type === "success" &&
											" bg-[linear-gradient(90.44deg,#091D13_-11.04%,#247252_99.93%)]"
									)}
								>
									<div className="absolute top-2/4 -translate-y-2/4 left-4">
										{icon ? icon : t.type === "error" ? <X /> : <Check />}
									</div>
									{message}
								</div>
							)
						}}
					</ToastBar>
				)}
			</Toaster>
		</QueryProvider>
	)
}
