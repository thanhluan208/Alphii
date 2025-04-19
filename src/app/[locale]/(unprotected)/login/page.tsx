"use client"

import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import Image from "next/image"

import { setCookie } from "@/app/actions"
import InputField from "@/components/common/fields/InputField"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { api } from "@/helpers"
import { Link, useRouter } from "@/i18n/routing"
import { ACCESS_TOKEN, Routes } from "@/lib/constant"
import { STATUS_CODE } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon, Lock, User } from "lucide-react"
import { z } from "zod"

import { useAuthentication } from "@/hooks/auth/useAuthentication"

export default function Login() {
	const t = useTranslations("login")
	const { handleLogin } = useAuthentication()
	const router = useRouter()

	const isBlocked = false

	const formSchema = z.object({
		username: z.string().min(2).max(50),
		password: z.string().min(6).max(50)
	})

	const signInForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: ""
		}
	})

	const handleSignIn = async (values: z.infer<typeof formSchema>) => {
		const response = await handleLogin.mutateAsync(values)
		if (response.status === STATUS_CODE.SUCCESS || STATUS_CODE.CREATED) {
			await setCookie(ACCESS_TOKEN, response.data.access_token)
			api.attachTokenToHeader(response.data.access_token)
			router.push(Routes.dashboard)
		}
	}
	return (
		<Form {...signInForm}>
			<div className=" space-y-8 flex-1 text-description ">
				<Image
					src="/imgs/login/img-logo.png"
					alt="Login Image"
					width={104}
					height={104}
				/>
				<div>
					<h1 className=" font-bold font-sans text-[32px] bg-[linear-gradient(90.44deg,#091D13_-11.04%,#247252_99.93%)] bg-clip-text tracking-tight text-transparent uppercase leading-[44px] ">
						{t("title")}
					</h1>
					<h2 className="text-[20px] leading-7 text-description ">
						{t("lPartner")}
					</h2>
				</div>

				<form onSubmit={signInForm.handleSubmit(handleSignIn)}>
					<div className="space-y-5">
						<div className="space-y-2">
							<FormField
								control={signInForm.control}
								name="username"
								render={({ field }) => (
									<InputField
										field={field}
										label={t("lUsername")}
										required
										name="username"
										placeholder={t("pUsername")}
										icon={<User />}
									/>
								)}
							/>
						</div>

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
										placeholder={t("pPassword")}
										icon={<Lock />}
										type="password"
									/>
								)}
							/>
						</div>

						{isBlocked && (
							<p className="text-destructive text-xl">{t("lBlock")}</p>
						)}

						<Button className="w-full" type="submit">
							{handleLogin?.isPending ? <LoaderIcon /> : t("lSign_in")}
						</Button>
						<p className="text-center text-description ">
							{t("lForgot_password")}{" "}
							<Link
								className="text-primary font-bold"
								href={Routes.forgotPassword}
							>
								{t("lClickHere")}
							</Link>
						</p>
					</div>
				</form>
			</div>
		</Form>
	)
}
