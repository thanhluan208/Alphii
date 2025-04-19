"use client"

import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import Image from "next/image"

import InputField from "@/components/common/fields/InputField"
import UserLogin from "@/components/icons/UserLogin"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { useRouter } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft } from "lucide-react"
import { z } from "zod"

import { useAuthentication } from "@/hooks/auth/useAuthentication"
import { STATUS_CODE } from "@/types"

export default function ForgotPassword() {
	const t = useTranslations("forgot-password")
	const router = useRouter()
	const { handleForgot } = useAuthentication()

	const formSchema = z.object({
		email: z.string().email().min(2).max(50)
	})

	const forgotForm = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: ""
		}
	})

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await handleForgot.mutateAsync(values.email)
		if(response.status === STATUS_CODE.CREATED) {
			router.push(`${Routes.otp}?user=${values.email}`)
		}
	}

	return (
		<Form {...forgotForm}>
			<div className=" space-y-8 flex-1">
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

				<form onSubmit={forgotForm.handleSubmit(handleSubmit)}>
					<div className="space-y-5">
						<div className="space-y-2">
							<FormField
								control={forgotForm.control}
								name="email"
								render={({ field }) => (
									<InputField
										field={field}
										label={t("lEmail")}
										required
										name="email"
										type="email"
										placeholder={t("pEmail")}
										icon={<UserLogin />}
									/>
								)}
							/>
						</div>

						<Button className="w-full uppercase font-bold" type="submit">
							{t("lSubmit")}
						</Button>
					</div>
				</form>
			</div>
		</Form>
	)
}
