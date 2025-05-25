"use client"

import InputField from "@/components/common/fields/InputField";
import { Button, Label } from "@/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUS_CODE } from "@/types"
import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

const ForgotPassword = () => {
    const translation = useTranslations("authentication")
    const [showVerify, setShowVerify] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const formSchema = z.object({
        email: z
            .string()
            .nonempty({ message: "Email is required" })
            .email({ message: "Invalid email format" })
            .max(50, { message: "Email must be at most 50 characters" }),
    });

    const forgotPassForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            // const response = await handleVerifyEmail.mutateAsync(
            //     data.email
            // );

            if (true) {
                setShowVerify(true);
            } else {
                // toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleConfirmOTP = async () => {
        if (otpValue.length === 6) {
            // const toastId = toast.loading(
            // t("common.processing", { process: t("verification.verify") })
            // );

            try {
                // const response = await handleSubmitOTP.mutateAsync({
                //     email: forgotPassForm.getValues().email_or_username,
                //     otp: otpValue,
                // });
                if (true) {
                    // toast.update(toastId, {
                    //     render: t("common.successfully", {
                    //         process: t("verification.verify"),
                    //     }),
                    //     type: toast.TYPE.SUCCESS,
                    //     autoClose: 2000,
                    //     isLoading: false,
                    // });
                    // navigate(ListRoutes.login);
                } else {
                    // toast.update(toastId, {
                    //     render:
                    //         response.message ||
                    //         t("common.failed", { process: t("verification.verify") }),
                    //     type: toast.TYPE.ERROR,
                    //     isLoading: false,
                    //     autoClose: 2000,
                    // });
                }
            } catch (err) {
                // toast.error("Something went wrong");
            }
        } else {
            // toast.error("Please enter a valid 6-digit OTP");
        }
    };

    const handleOTPChange = (code: string) => {
        setOtpValue(code);
    };
    const handleResendCode = async () => {
        const email = forgotPassForm.getValues().email;
        if (!email) {
            // toast.error(t("verification.emailOrUsernameRequired"));
            return;
        }

        // const toastId = toast.loading(
        //     t("common.processing", { process: t("verification.resendCode") })
        // );

        try {
            // const response = await handleVerifyEmail.mutateAsync(email);

            if (true) {
                // toast.update(toastId, {
                //     render: t("common.successfully", {
                //         process: t("verification.resendCode"),
                //     }),
                //     type: toast.TYPE.SUCCESS,
                //     autoClose: 2000,
                // });
            } else {
                // toast.update(toastId, {
                //     render:
                //         response.message ||
                //         t("common.failed", { process: t("verification.resendCode") }),
                //     type: toast.TYPE.ERROR,
                //     isLoading: false,
                //     autoClose: 2000,
                // });
            }
        } catch (error) {
            // toast.update(toastId, {
            //     render: t("common.failed", { process: t("verification.resendCode") }),
            //     type: toast.TYPE.ERROR,
            //     isLoading: false,
            //     autoClose: 2000,
            // });
            console.error(error);
        }
    };

    return (
        <div
            className="relative h-screen content-center bg-[#F7F7F7]">
            <Form {...forgotPassForm}>
                <Card className="relative bg-white pl-6 pr-6 pb-6 shadow-md w-11/12 max-w-md z-10 m-auto rounded-3xl border border-[#EBEBEB]">
                    <img
                        src="/images/authentication/Green-n-Blue.png"
                        alt="Character logo"
                        className="w-[8.75rem] h-[4.375rem] object-cover object-top absolute top-[-4.375rem] left-1/2 transform -translate-x-1/2"
                    />

                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl flex gap-2 items-center justify-center">
                            <p className="text-[#171717]">{translation("forgotPasswordCardTitle")}</p>
                        </CardTitle>
                        <CardDescription className="text-center text-[#5C5C5C]">
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
                                                className="rounded-[10px] border border-[#EBEBEB]"
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
                                    className="w-full bg-[#7D52F4]"
                                    onClick={() => forgotPassForm.trigger("email")}
                                >
                                    {translation("resetPasswordButton")}
                                </Button>
                            </div>
                            <div className="mt-3 text-center text-sm text-[#5C5C5C]">
                                {translation("noAccess")}{" "}
                            </div>
                            <div className="text-center text-sm underline text-[#5C5C5C]">
                                <Link href={'#'} className="font-medium text-[#171717]">
                                    {translation("tryAnotherMethodLink")}
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Form>
        </div>
    );
};

export default ForgotPassword;