import React, { useState } from "react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from "@/components/ui/input-otp"
import { useRouter } from "@/i18n/routing"
import { Routes } from "@/lib/constant"
import { STATUS_CODE } from "@/types"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import useMutateAuthentication from "@/hooks/authentication/useMutateAuthentication"

interface VerifyDialogProps {
	open: boolean
	setOpen: (value: boolean) => void
	email: string
}

const VerifyDialog = ({ open, setOpen, email }: VerifyDialogProps) => {
	const router = useRouter()
	const [otpValue, setOtpValue] = useState("")

	const { handleVerifyEmail, handleSubmitOTP } = useMutateAuthentication()

	const handleOTPChange = (code: string) => {
		console.log("code", code)
		setOtpValue(code)
	}

	const handleConfirmOTP = async () => {
		if (otpValue.length === 6) {
			try {
				const response = await handleSubmitOTP.mutateAsync({
					email,
					otp: otpValue
				})
				if (response.status_code === STATUS_CODE.SUCCESS) {
					toast.success(response.message || "Verify successfully!")
					setOpen(false)
					router.push(Routes.LOGIN)
				} else {
					toast.error(response.message || "Verify failed!")
				}
			} catch (err) {
				toast.error("Verify failed!")
				console.error(err)
			}
		} else {
			toast.error(
				"Invalid OTP: The verification code is incorrect or has expired. Please try again."
			)
		}
	}

	const handleResendCode = async () => {
		if (!email) {
			toast.error("Email is required to resend the verification code.")
			return
		}

		try {
			const response = await handleVerifyEmail.mutateAsync(email)

			if (response.status_code === STATUS_CODE.SUCCESS) {
				toast.success("Resend code successfully!")
				setOtpValue("")
			} else {
				toast.error("Resend code failed!")
			}
		} catch (error) {
			toast.error("Resend code failed!")
			console.error(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-6">
				<DialogHeader>
					<DialogTitle className="text-center">Verify your email</DialogTitle>
					<DialogDescription className="text-center">
						We have sent a verification code to your email. Please enter the
						code below to verify your email.
					</DialogDescription>
				</DialogHeader>

				<InputOTP
					maxLength={6}
					pattern={REGEXP_ONLY_DIGITS}
					onChange={handleOTPChange}
				>
					<InputOTPGroup className="gap-2">
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
					</InputOTPGroup>
					<InputOTPSeparator />
					<InputOTPGroup className="gap-2">
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
				<div className="text-center">
					<button
						className="text-primary-theme hover:opacity-80 text-sm font-medium underline"
						onClick={handleResendCode}
					>
						Resend code
					</button>
				</div>
				<Button className="w-full" onClick={handleConfirmOTP}>
					{" "}
					Confirm
				</Button>
			</DialogContent>
		</Dialog>
	)
}

export default VerifyDialog
