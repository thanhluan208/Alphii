"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import Image from "next/image"

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
import { Link } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import useMutateAuthentication from "@/hooks/authentication/useMutateAuthentication"
import { STATUS_CODE } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"

const ForgotPassword = () => {
	const slideVariants = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
		transition: { duration: 0.3 },
	};

	const translation = useTranslations("authentication")
	const router = useRouter()
	const { toast } = useToast()
	const [showVerify, setShowVerify] = useState(false)
	const [otpValue, setOtpValue] = useState("")
	const { handleForgotPass, handleVerifyEmail, handleSubmitOTP } = useMutateAuthentication();
	const isPending = handleForgotPass.isPending;

	const forgotPassFormSchema = z.object({
		email: z
			.string()
			.nonempty({ message: "Email is required" })
			.email({ message: "Invalid email format" })
			.max(50, { message: "Email must be at most 50 characters" })
	})

	const verifyCodeFormSchema = z.object({
		code: z
			.string()
			.nonempty({ message: "Please input verification code to continue" })
	})

	const forgotPassForm = useForm<z.infer<typeof forgotPassFormSchema>>({
		resolver: zodResolver(forgotPassFormSchema),
		defaultValues: {
			email: ""
		}
	})

	const verifyCodeForm = useForm<z.infer<typeof verifyCodeFormSchema>>({
		resolver: zodResolver(verifyCodeFormSchema),
		defaultValues: {
			code: ""
		}
	})

	const handleSubmit = async (data: z.infer<typeof forgotPassFormSchema>) => {
		if (isPending) {
			return;
		}

		try {
			const response = await handleForgotPass.mutateAsync(
				forgotPassForm.getValues()
			);

			if (response.status_code === STATUS_CODE.SUCCESS) {
				toast({
					title: "Reset password request sent",
					description: "Please check your email for the verification code.",
					duration: 3000
				})

				setShowVerify(true)
			} else {
				toast({
					title: "Request to reset password failed",
					description: "An error occurred: " + response.message,
					duration: 3000
				})
			}
		} catch (error) {
			toast({
				title: "Request to reset password failed",
				duration: 3000
			})
		}
	}

	const handleConfirmOTP = async () => {
		if (otpValue.length === 4) {
			try {
				const response = await handleSubmitOTP.mutateAsync({
					email: forgotPassForm.getValues().email,
					otp: otpValue,
				});
				if (response.status_code === STATUS_CODE.SUCCESS) {
					toast({
						title: "Verication successful",
						description: "You can now reset your password",
						duration: 3000
					})
					router.push(Routes.LOGIN)
				} else {
					toast({
						title: "Verication failed",
						description: "Verification code is incorrect or expired",
						duration: 3000
					})
				}
			} catch (err) {
				toast({
					title: "Something went wrong",
				})
			}
		} else {
			toast({
				title: "Invalid verification code",
				description: "Please enter a valid 4-digit verification code",
				duration: 3000
			})
		}
	}

	const handleOTPChange = (code: string) => {
		setOtpValue(code)
	}

	return (
		<div className="relative h-screen content-center bg-background">
			<AnimatePresence mode="wait">
				{!showVerify && (
					<Form {...forgotPassForm}>
						<Card className="relative bg-alphii_bg_weak_50 pl-6 pr-6 pb-6 shadow-md w-11/12 max-w-md z-10 m-auto rounded-3xl border border-alphii_border_2">
							<Image
								width={140}
								height={70}
								src="/images/authentication/Green-n-Blue.png"
								alt="Character logo"
								className="w-[8.75rem] h-[4.375rem] object-cover object-top absolute top-[-4.375rem] left-1/2 transform -translate-x-1/2"
							/>

							<CardHeader className="pb-4">
								<CardTitle className="text-xl flex gap-2 items-center justify-center">
									<p className="">{translation("forgotPasswordCardTitle")}</p>
								</CardTitle>
								<CardDescription className="text-center text-alphii_text_sub_600">
									{translation("forgotPasswordCardDesc")}
								</CardDescription>
							</CardHeader>

							<CardContent className="p-0">
								<form onSubmit={forgotPassForm.handleSubmit(handleSubmit)}>
									<div className="flex flex-col gap-4">
										<div className="grid gap-2">
											<FormField
												control={forgotPassForm.control}
												name="email"
												render={({ field }) => (
													<InputField
														className="rounded-[10px] border border-alphii_border_2"
														field={field}
														label={translation("emailLabel")}
														name="email"
														maxLength={50}
													/>
												)}
											/>
										</div>
										<Button
											type="submit"
											className="w-full bg-primary"
											onClick={() => forgotPassForm.trigger("email")}
										>
											{translation("resetPasswordButton")}
										</Button>
									</div>
									<div className="mt-3 text-center text-sm text-alphii_text_sub_600">
										{translation("noAccess")}{" "}
									</div>
									<div className="text-center text-sm underline text-alphii_text_sub_600">
										<Link href={Routes.LOGIN} className="font-medium ">
											{translation("tryAnotherMethodLink")}
										</Link>
									</div>
								</form>
							</CardContent>
						</Card>
					</Form>
				)}

				{showVerify && (
					<motion.div
						key="verify"
						initial="initial"
						animate="animate"
						exit="exit"
						transition={slideVariants.transition}
						variants={slideVariants}
						className="w-full"
					>
						<Form {...verifyCodeForm}>
							<Card className="relative bg-alphii_bg_weak_50 pl-6 pr-6 pb-6 shadow-md w-11/12 max-w-md z-10 m-auto rounded-3xl border border-alphii_border_2">
								<Image
									width={140}
									height={70}
									src="/images/authentication/Yellow.png"
									alt="Character logo"
									className="w-24 object-cover object-top absolute top-[-6rem] -left-28"
								/>

								<Image
									width={140}
									height={70}
									src="/images/authentication/Purple.png"
									alt="Character logo"
									className="w-24 object-cover object-top absolute bottom-[-2rem] -right-32 scale-x-[-1]"
								/>

								<CardHeader className="pb-4">
									<CardTitle className="text-xl flex gap-2 items-center justify-center">
										<p className="">Enter Verification Code</p>
									</CardTitle>
									<CardDescription className="text-center text-alphii_text_sub_600">
										We have sent a code to <span className="font-semibold">{forgotPassForm.getValues().email}</span>
									</CardDescription>
								</CardHeader>

								<CardContent className="p-0">
									<form onSubmit={forgotPassForm.handleSubmit(handleSubmit)}>
										<div className="flex flex-col gap-4">
											<InputOTP
												maxLength={4}
												pattern="^\\d+$"
												onChange={handleOTPChange}
											>
												<InputOTPGroup className=" justify-between w-full">
													<InputOTPSlot className="w-[24%] mr-1 rounded-[10px] border border-alphii_border_2" index={0} />
													<InputOTPSlot className="w-[24%] ml-1 mr-1 rounded-[10px] border border-alphii_border_2" index={1} />
													<InputOTPSlot className="w-[24%] ml-1 mr-1 rounded-[10px] border border-alphii_border_2" index={2} />
													<InputOTPSlot className="w-[24%] ml-1 rounded-[10px] border border-alphii_border_2" index={3} />
												</InputOTPGroup>
											</InputOTP>

											<Button
												type="submit"
												className="w-full bg-primary"
												onClick={() => forgotPassForm.trigger("email")}
											>
												{translation("resetPasswordButton")}
											</Button>
										</div>
										<div className="mt-3 text-center text-sm text-alphii_text_sub_600">
											{translation("noAccess")}{" "}
										</div>
										<div className="text-center text-sm underline text-alphii_text_sub_600">
											<Link href={Routes.LOGIN} className="font-medium ">
												{translation("tryAnotherMethodLink")}
											</Link>
										</div>
									</form>
								</CardContent>
							</Card>
						</Form>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ForgotPassword
