"use client"

import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"

import InputField from "@/components/common/fields/InputField"
import { Button } from "@/components/ui"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { api } from "@/helpers"
import { Link } from "@/i18n/routing"
import { LOCAL_STORAGE_KEY, Routes } from "@/lib/constant"
import { STATUS_CODE } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { isEmpty } from "lodash"
import { z } from "zod"

import useUserStore from "@/stores/userStore"
import useMutateAuthentication from "@/hooks/authentication/useMutateAuthentication"
import { useToast } from "@/hooks/use-toast"

const Login = () => {
	const translation = useTranslations("authentication")
	const { handleLogin } = useMutateAuthentication()
	const { toast } = useToast()
	const router = useRouter()
	const { setToken, setUserId } = useUserStore()
	const formSchema = z.object({
		email_or_username: z.string().min(2).max(50),
		password: z.string().min(6).max(50)
	})

	const loginForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email_or_username: "",
			password: ""
		}
	})

	const handleGoogleLogIn = (event: React.FormEvent) => {
		event.preventDefault()
		const popup = window.open(
			Routes.GOOGLE_LOGIN,
			"oauth",
			"width=500,height=600"
		)

		window.addEventListener("message", (event) => {
			if (event.origin !== Routes.SOCIAL_LOGIN_ORIGIN) {
				console.error("Invalid origin:", event.origin)
				return
			}

			const accessToken = event.data.access_token
			const refreshToken = event.data.refresh_token
			const user_email = event.data.user_data.email
			popup?.close()
			socialLoginProceeding(accessToken, refreshToken, event.data)
		})
	}

	const handleGithubLogIn = (event: React.FormEvent) => {
		event.preventDefault()
		const popup = window.open(
			Routes.GITHUB_LOGIN,
			"oauth",
			"width=500,height=600"
		)

		window.addEventListener("message", (event) => {
			if (event.origin !== Routes.SOCIAL_LOGIN_ORIGIN) {
				console.error("Invalid origin:", event.origin)
				return
			}

			const accessToken = event.data.access_token
			const refreshToken = event.data.refresh_token
			const user_email = event.data.user_data.email
			popup?.close()
			socialLoginProceeding(accessToken, refreshToken, event.data)
		})
	}

	const socialLoginProceeding = (
		accessToken: string,
		refreshToken: string,
		data: any
	) => {
		if (
			data &&
			data.user_data &&
			data.user_data.status_code === STATUS_CODE.SUCCESS
		) {
			toast({
				title: "Login Successful",
				description: "Welcome back!",
				duration: 3000
			})
			api.attachTokenToHeader(accessToken)
			setToken(accessToken)
			setUserId(data.user_data.user_id)
			if (typeof window !== "undefined") {
				localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)
				localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken)
				localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, data.user_data.user_id)
				localStorage.setItem(
					LOCAL_STORAGE_KEY.USER_DATA,
					JSON.stringify(data.user_data)
				)
			}

			router.push(Routes.ROOT)
		} else {
			toast({
				title: "Login Failed",
				description: data.message,
				duration: 3000
			})
		}
	}

	const handleSubmit = async () => {
		if (handleLogin.isPending) {
			return
		}

		try {
			const response = await handleLogin.mutateAsync(loginForm.getValues())

			if (response.status_code === STATUS_CODE.SUCCESS) {
				toast({
					title: "Login Successful",
					description: "Welcome back!",
					duration: 3000
				})
				api.attachTokenToHeader(response.access_token)
				setToken(response.access_token)
				setUserId(response.user_data.id)

				if (typeof window !== "undefined") {
					localStorage.setItem(
						LOCAL_STORAGE_KEY.ACCESS_TOKEN,
						response.access_token
					)
					localStorage.setItem(
						LOCAL_STORAGE_KEY.REFRESH_TOKEN,
						response.refresh_token
					)
					localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, response.user_data.id)
					localStorage.setItem(
						LOCAL_STORAGE_KEY.USER_DATA,
						JSON.stringify(response.user_data)
					)
				}

				router.push(Routes.ROOT)
			} else {
				toast({
					title: "Login Failed",
					description: response.message,
					duration: 3000
				})
			}
		} catch (error) {
			toast({
				title: "Login Failed",
				description: "An error occurred while logging in: " + error,
				duration: 3000
			})
		}
	}

	const formErr = loginForm.formState.errors
	const isDirty = loginForm.formState.isDirty

	return (
		<div className="relative h-screen content-center bg-background">
			<Form {...loginForm}>
				<Card className="relative bg-alphii_bg_weak_50 pl-6 pr-6 pb-6 shadow-md w-11/12 max-w-md z-10 m-auto rounded-3xl border border-alphii_border_2">
					<Image
						src="/images/authentication/Yellow.png"
						alt="Character logo"
						className="w-24 absolute bottom-24 -left-32 hidden md:block"
						width={96}
						height={96}
					/>

					<Image
						src="/images/authentication/Purple.png"
						alt="Character logo"
						className="w-24 absolute bottom-20 -right-32 scale-x-[-1] hidden md:block"
						width={96}
						height={96}
					/>

					<Image
						src="/images/authentication/Green-n-Blue.png"
						alt="Character logo"
						width={140}
						height={80}
						className="w-[8.75rem] h-[4.375rem] object-cover object-top absolute top-[-4.375rem] left-1/2 transform -translate-x-1/2 top-character"
					/>

					<CardHeader className="pb-4 z-20">
						<CardTitle className="text-xl flex gap-2 items-center justify-center">
							<p className="">{translation("loginCardTitle")}</p>
						</CardTitle>
						<CardDescription className="text-alphii_text_sub_600 text-center">
							{translation("loginCardDesc")}
						</CardDescription>
					</CardHeader>
					<CardContent className="p-0 pb-2">
						<Button
							className="w-full h-10 mb-3 shadow-none rounded-[10px] bg-none border border-alphii_border_2"
							style={{ backgroundColor: "#FFFFFF", color: "#171717" }}
							onClick={handleGoogleLogIn}
						>
							<Image
								src="/images/google.svg"
								alt="Google logo"
								className="w-5 h-5 mr-1"
								width={20}
								height={20}
							/>
							{translation("googleButton")}
						</Button>

						<Button
							className="w-full  h-10 mb-2 shadow-none rounded-[10px] bg-none border border-alphii_border_2"
							style={{ backgroundColor: "#FFFFFF", color: "#171717" }}
							onClick={handleGithubLogIn}
						>
							<Image
								src="/images/github.png"
								alt="Github logo"
								className="w-5 h-5 mr-1"
								width={20}
								height={20}
							/>
							{translation("githubButton")}
						</Button>
					</CardContent>

					{/* horizontal divider */}
					<div className="flex items-center">
						<hr className="flex-grow " />
						<span className="pl-2 pr-2 text-alphii_text_sub_600 text-xs">
							{translation("horizontalLine").toUpperCase()}
						</span>
						<hr className="flex-grow " />
					</div>

					<CardContent className="p-0 mt-3">
						<form onSubmit={loginForm.handleSubmit(handleSubmit)}>
							<div className="flex flex-col">
								<div className="grid gap-2 mb-3">
									<FormField
										control={loginForm.control}
										name="email_or_username"
										render={({ field }) => (
											<InputField
												className="h-10 rounded-[10px] border border-alphii_border_2"
												field={field}
												label={translation("emailLabel")}
												name="email_or_username"
												maxLength={50}
											/>
										)}
									/>
								</div>
								<div className="grid gap-2 mb-3">
									<FormField
										control={loginForm.control}
										name="password"
										render={({ field }) => (
											<InputField
												className="h-10 rounded-[10px] border border-alphii_border_2"
												field={field}
												label={translation("passwordLabel")}
												name="password"
												type="password"
											/>
										)}
									/>
								</div>
								<div className="text-sm mb-3 text-alphii_text_sub_600">
									{translation("forgotPassword")}{" "}
									<Link
										href={Routes.FORGOT_PASSWORD}
										className="font-medium hover:underline text-primary"
									>
										{translation("resetLink")}
									</Link>
								</div>
								<Button
									type="submit"
									className="w-full bg-primary"
									disabled={
										!isEmpty(formErr) || !isDirty || handleLogin.isPending
									}
								>
									{translation("loginButton")}
								</Button>
							</div>
							<div className="mt-3 text-center text-sm text-alphii_text_sub_600">
								{translation("noAccount")}{" "}
								<Link
									href={Routes.REGISTER}
									className="font-medium hover:underline "
								>
									{translation("registerLink")}
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
			</Form>
		</div>
	)
}

export default Login
