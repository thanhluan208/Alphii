"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"

import InputField from "@/components/common/fields/InputField"
import { Button, Label } from "@/components/ui"
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
import { CheckCircle2, XCircle } from "lucide-react"
import { z } from "zod"

import useUserStore from "@/stores/userStore"
import { toast, useToast } from "@/hooks/use-toast"

const passwordCriteria = [
	{
		label: "At least 1 uppercase",
		test: (pw: string) => /[A-Z]/.test(pw)
	},
	{
		label: "At least 1 number",
		test: (pw: string) => /\d/.test(pw)
	},
	{
		label: "At least 8 characters",
		test: (pw: string) => pw.length >= 8
	}
]

const Register = () => {
	const translation = useTranslations("authentication")
	const { toast } = useToast()
	const router = useRouter()
	const { setToken, setUserId } = useUserStore()
	const [passwordStrength, setPasswordStrength] = useState(0)
	const [currentPassword, setCurrentPassword] = useState("")

	const getPasswordStrength = (password: string) => {
		let passed = 0
		for (const criterion of passwordCriteria) {
			if (criterion.test(password)) passed++
		}
		return passed
	}

	useEffect(() => {
		setPasswordStrength(getPasswordStrength(currentPassword))
	}, [currentPassword])

	const formSchema = z.object({
		email_or_username: z.string().min(2).max(50),
		password: z.string().min(6).max(50)
	})

	const registerForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email_or_username: "",
			password: ""
		}
	})

	const handleGoogleRegister = (event: React.FormEvent) => {
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

	const handleGithubRegister = (event: React.FormEvent) => {
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

	const handleSubmit = async () => {}

	return (
		<div className="relative h-screen content-center bg-background">
			<Form {...registerForm}>
				<Card className="relative bg-alphii_bg_weak_50 pl-6 pr-6 pb-6 shadow-md w-11/12 max-w-md z-10 m-auto rounded-3xl border border-alphii_border_2">
					<Image
						width={96}
						height={96}
						src="/images/authentication/Yellow.png"
						alt="Character logo"
						className="w-24 absolute bottom-56 -left-32 hidden md:block"
					/>

					<Image
						width={96}
						height={96}
						src="/images/authentication/Purple.png"
						alt="Character logo"
						className="w-24 absolute bottom-32 -right-32 scale-x-[-1] hidden md:block"
					/>

					<Image
						width={140}
						height={70}
						src="/images/authentication/Green-n-Blue.png"
						alt="Character logo"
						className="w-[8.75rem] h-[4.375rem] object-cover object-top absolute top-[-4.375rem] left-1/2 transform -translate-x-1/2 top-character"
					/>

					<CardHeader className="pb-4">
						<CardTitle className="text-xl flex gap-2 items-center justify-center">
							<p className="text-[#171717]">
								{translation("registerCardTitle")}
							</p>
						</CardTitle>
						<CardDescription className="text-center text-alphii_text_sub_600">
							{translation("registerCardDesc")}
						</CardDescription>
					</CardHeader>
					<CardContent className="p-0 pb-2">
						<Button
							className="w-full bg-alphii_bg_weak_50 text-black h-10 mb-3 shadow-none rounded-[10px] bg-none border border-alphii_border_2"
							onClick={handleGoogleRegister}
						>
							<Image
								height={20}
								width={20}
								src="/images/google.svg"
								alt="Google logo"
								className="w-5 h-5 mr-1"
							/>
							{translation("googleButton")}
						</Button>

						<Button
							className="w-full bg-alphii_bg_weak_50 text-black h-10 mb-2 shadow-none rounded-[10px] bg-none border border-alphii_border_2"
							onClick={handleGithubRegister}
						>
							<Image
								height={20}
								width={20}
								src="/images/github.png"
								alt="Github logo"
								className="w-5 h-5 mr-1"
							/>
							{translation("githubButton")}
						</Button>
					</CardContent>

					{/* horizontal divider */}
					<div className="flex items-center">
						<hr className="flex-grow text-alphii_border_2" />
						<span
							className="pl-2 pr-2"
							style={{ color: "#62636C", fontSize: "12px" }}
						>
							{translation("horizontalLine").toUpperCase()}
						</span>
						<hr className="flex-grow text-alphii_border_2" />
					</div>

					<CardContent className="p-0 mt-3">
						<form onSubmit={registerForm.handleSubmit(handleSubmit)}>
							<div className="flex flex-col">
								<div className="grid gap-2 mb-2">
									<FormField
										control={registerForm.control}
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
								<div className="grid gap-2 mb-2">
									<FormField
										control={registerForm.control}
										name="password"
										render={({ field }) => (
											<InputField
												className="h-10 rounded-[10px] border border-alphii_border_2"
												field={{
													...field,
													onChange: (e) => {
														field.onChange(e)
														setCurrentPassword(e.target.value)
													}
												}}
												label={translation("passwordLabel")}
												name="password"
												type="password"
											/>
										)}
									/>
								</div>
								<div className="text-sm text-alphii_text_sub_600">
									{/* Strength bar */}
									<div className="flex gap-2">
										{[0, 1, 2].map((index) => (
											<div
												key={index}
												className="h-1 flex-1 rounded-full"
												style={{
													backgroundColor:
														passwordStrength >= index + 1
															? passwordStrength === 1
																? "#EF4444" // red
																: passwordStrength === 2
																	? "#F59E0B" // yellow
																	: "#22C55E" // green
															: "#E5E7EB" // gray
												}}
											/>
										))}
									</div>

									{/* Criteria check */}
									<div className="mt-2 flex flex-col gap-1 text-sm">
										{translation("passwordMustContain")}
										{passwordCriteria.map((criterion, idx) => {
											const passed = criterion.test(currentPassword)
											return (
												<div key={idx} className="flex items-center gap-2">
													{passed ? (
														<CheckCircle2
															size={16}
															className="text-green-500"
														/>
													) : (
														<XCircle size={16} className="text-gray-400" />
													)}
													<span
														style={{ color: passed ? "#22C55E" : "#5C5C5C" }}
													>
														{criterion.label}
													</span>
												</div>
											)
										})}
									</div>
								</div>
								<Button type="submit" className="w-full mt-4 bg-[#7D52F4]">
									{translation("registerButton")}
								</Button>
							</div>
							<div className="mt-3 text-center text-sm text-alphii_text_sub_600">
								{translation("alreadyHaveAccount")}{" "}
								<Link
									href={Routes.LOGIN}
									className="font-medium hover:underline "
								>
									{translation("loginLink")}
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
			</Form>
		</div>
	)
}

export default Register
