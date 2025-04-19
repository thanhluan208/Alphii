"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import InputField from "@/components/common/fields/InputField"
import Password from "@/components/icons/Password"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { useRouter } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { STATUS_CODE } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft } from "lucide-react"
import { z } from "zod"

import { useAuthentication } from "@/hooks/auth/useAuthentication"

export default function ResetPassword() {
	const t = useTranslations("reset-password")
	const router = useRouter()
	const { handleReset } = useAuthentication()

	const searchParams = useSearchParams()

	const user = searchParams.get("user") || ""

	const formSchema = z
		.object({
			password: z
				.string()
				.min(8, { message: t("fmMinLengthString", { value: 8 }) })
				.max(30, { message: t("fmMaxLengthString", { value: 30 }) })
				.regex(/[a-z]/, { message: t("fmLowercaseRequired", { value: 1 }) })
				.regex(/[A-Z]/, { message: t("fmUppercaseRequired", { value: 1 }) })
				.regex(/[0-9]/, { message: t("fmNumberRequired", { value: 1 }) })
				.regex(/[^A-Za-z0-9]/, {
					message: t("fmSpecialCharRequired", { value: 1 })
				}),
			confirmPassword: z
				.string()
				.min(8, { message: t("fmMinLengthString", { value: 8 }) })
				.max(30, { message: t("fmMaxLengthString", { value: 30 }) })
				.regex(/[a-z]/, { message: t("fmLowercaseRequired", { value: 1 }) })
				.regex(/[A-Z]/, { message: t("fmUppercaseRequired", { value: 1 }) })
				.regex(/[0-9]/, { message: t("fmNumberRequired", { value: 1 }) })
				.regex(/[^A-Za-z0-9]/, {
					message: t("fmSpecialCharRequired", { value: 1 })
				})
		})
		.refine((data) => data.confirmPassword.trim() === data.password.trim(), {
			message: t("lPasswordsDoNotMatch"),
			path: ["confirmPassword"]
		})

	const signInForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			confirmPassword: ""
		}
	})

	const handleSignIn = async (values: z.infer<typeof formSchema>) => {
		if (!user) return
		const payload = {
			username: user,
			password: values.password,
			confirmPassword: values.confirmPassword
		}

		const response = await handleReset.mutateAsync(payload)

		if (response.status === STATUS_CODE.CREATED) {
			router.push(Routes.login)
		}
	}

	return (
		<Form {...signInForm}>
			<div className="flex-1">
				<Image
					src="/imgs/login/img-logo.png"
					alt="Login Image"
					width={104}
					height={104}
				/>
				<div>
					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							className="p-1"
							onClick={() => router.back()}
						>
							<ChevronLeft className="text-primary !h-6 !w-6" />
						</Button>
						<h1 className=" font-bold font-sans text-[32px] bg-[linear-gradient(90.44deg,#091D13_-11.04%,#247252_99.93%)] bg-clip-text tracking-tight text-transparent uppercase leading-[44px] ">
							{t("lTitle")}
						</h1>
					</div>
					<h2 className="text-[20px] leading-7">{t("lDescription")}</h2>
				</div>

				<p className="font-semibold leading-[18px] mt-8 text-primary">
					{t("lRequirement")}
				</p>
				<div className="pl-2">
					<li className="!mt-0 ">{t("lRequire1")}</li>
					<li className="!mt-0 ">{t("lRequire2")}</li>
				</div>

				<form className="mt-8" onSubmit={signInForm.handleSubmit(handleSignIn)}>
					<div className="space-y-5">
						<div className="space-y-2">
							<FormField
								control={signInForm.control}
								name="password"
								render={({ field }) => (
									<InputField
										field={field}
										label={t("lPassword")}
										required
										name="password"
										type="password"
										placeholder={t("pPassword")}
										icon={<Password />}
									/>
								)}
							/>
						</div>
						<div className="space-y-2">
							<FormField
								control={signInForm.control}
								name="confirmPassword"
								render={({ field }) => (
									<InputField
										field={field}
										label={t("lConfirmPassword")}
										required
										name="confirmPassword"
										type="password"
										placeholder={t("pConfirmPassword")}
										icon={<Password />}
									/>
								)}
							/>
						</div>
					</div>
					<Button
						className="w-full mt-8 h-12 rounded-xl uppercase font-bold"
						type="submit"
					>
						{t("lSubmit")}
					</Button>
				</form>
			</div>
		</Form>
	)
}
