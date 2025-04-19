import toast from "react-hot-toast"
import { useTranslations } from "next-intl"

import { AuthServices } from "@/services"
import { DefaultResponse } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useAuthentication = () => {
	const commonTranslation = useTranslations("common")
	const authTranslation = useTranslations("auth")

	const handleLogin = useMutation({
		mutationFn: (payload: { username: string; password: string }) => {
			return AuthServices.login(payload)
		},
		onSuccess: () => {
			toast.success(
				commonTranslation("aSuccess", { action: authTranslation("aLogin") })
			)
		},
		onError: (error: AxiosError<DefaultResponse<string>>) => {
			toast.error(
				error?.response?.data.message ||
					commonTranslation("aFailed", { action: authTranslation("aLogin") })
			)
		}
	})

	const handleForgot = useMutation({
		mutationFn: (username: string) => {
			return AuthServices.forgotPassword(username)
		},
		onSuccess: () => {
			toast.success(authTranslation("aForgotSuccess"))
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", { action: authTranslation("aForgot") })
			)
		}
	})

	const handleReset = useMutation({
		mutationFn: (body: {
			username: string
			password: string
			confirmPassword: string
		}) => {
			return AuthServices.resetPassword(body)
		},
		onSuccess: () => {
			toast.success(
				commonTranslation("aSuccess", { action: authTranslation("aReset") })
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", { action: authTranslation("aReset") })
			)
		}
	})

	const handleValidateReset = useMutation({
		mutationFn: ({ user, otp }: { user: string; otp: string }) => {
			return AuthServices.validateReset(user, otp)
		},
		onSuccess: () => {
			toast.success(
				commonTranslation("aSuccess", { action: authTranslation("aValidate") })
			)
		},
		onError: () => {
			toast.error(
				commonTranslation("aFailed", { action: authTranslation("aValidate") })
			)
		}
	})

	return { handleLogin, handleForgot, handleReset, handleValidateReset }
}
