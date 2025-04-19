"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

import Spinner from "@/components/icons/Spinner"
import { Button } from "@/components/ui/button"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from "@/components/ui/input-otp"
import { useRouter } from "@/i18n/routing"
import { COUNT_DOWN_OTP, Routes } from "@/lib/constant"
import { toTimeFormat } from "@/lib/utils"
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { ChevronLeft } from "lucide-react"

import { useAuthentication } from "@/hooks/auth/useAuthentication"
import { useCountdownByDuration } from "@/hooks/useCountDown"
import { STATUS_CODE } from "@/types"

export default function ResetPassword() {
	const t = useTranslations("otp")
	const router = useRouter()
	const { handleValidateReset } = useAuthentication()
	const [value, setValue] = useState("")

	const searchParams = useSearchParams()

	const user = searchParams.get("user")

	const remain = useCountdownByDuration(COUNT_DOWN_OTP)

	const handleChange = async (value: string) => {
		if (!user) return
		setValue(value)
		if (value.length === 6) {
			const response = await handleValidateReset.mutateAsync({
				user,
				otp: value
			})

			if(response.status === STATUS_CODE.SUCCESS) {
				router.push(`${Routes.resetPassword}?user=${response?.data}`)
			}
		}
	}

	return (
		<div className="flex-1">
			<Image
				src="/imgs/login/img-logo.png"
				alt="Login Image"
				width={104}
				height={104}
			/>
			<div>
				<div className="flex items-center gap-1">
					<Button variant="ghost" className="p-1" onClick={() => router.back()}>
						<ChevronLeft className="text-primary !h-6 !w-6" />
					</Button>
					<h1 className=" font-bold font-sans text-[32px] bg-[linear-gradient(90.44deg,#091D13_-11.04%,#247252_99.93%)] bg-clip-text tracking-tight text-transparent uppercase leading-[44px] ">
						{t("lTitle")}
					</h1>
				</div>
				<h2 className="text-[20px] leading-7 text-description">
					{t("lDescription")}
				</h2>
			</div>

			<p className="mt-8 text-center text-xl leading-7 text-description">
				{t("lSubDescription")}
			</p>

			<div className="mt-8 flex gap-2 items-center justify-center flex-col">
				<InputOTP
					maxLength={6}
					pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
					onChange={handleChange}
					value={value}
				>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTP>
				<p>
					{t("lQuestion")}{" "}
					{remain && (
						<span className="ml-2 font-semibold text-primary">
							{toTimeFormat(remain, "mm:ss")}
						</span>
					)}
				</p>

				<Button
					className="w-full mt-8 h-12 rounded-xl uppercase font-bold"
					type="submit"
					disabled={handleValidateReset.isPending || value?.length < 6}
				>
					{handleValidateReset.isPending ? <Spinner /> : t("lSubmit")}
				</Button>
			</div>
		</div>
	)
}
