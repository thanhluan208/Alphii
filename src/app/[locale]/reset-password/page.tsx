"use client"

import InputField from "@/components/common/fields/InputField";
import { Button, Label } from "@/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

const passwordCriteria = [
    {
        label: "At least 1 uppercase",
        test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
        label: "At least 1 number",
        test: (pw: string) => /\d/.test(pw),
    },
    {
        label: "At least 8 characters",
        test: (pw: string) => pw.length >= 8,
    },
];

const ResetPassword = () => {
    const translation = useTranslations("authentication")
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [currentPassword, setCurrentPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");

    const getPasswordStrength = (password: string) => {
        let passed = 0;
        for (const criterion of passwordCriteria) {
            if (criterion.test(password)) passed++;
        }
        return passed;
    };

    useEffect(() => {
        setPasswordStrength(getPasswordStrength(currentPassword));
    }, [currentPassword]);

    const formSchema = z.object({
        new_password: z.string().min(6).max(50),
        retype_password: z.string(),
    }).refine((data) => data.new_password === data.retype_password, {
        message: "Passwords do not match",
        path: ["retype_password"]
    });;

    const resetPasswordForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            new_password: "",
            retype_password: "",
        },
    });

    const isPasswordStrong = passwordStrength === passwordCriteria.length;
    const isRetypeMatch = resetPasswordForm.watch("new_password") === resetPasswordForm.watch("retype_password");
    const isValidForm = isPasswordStrong && isRetypeMatch;

    return (
        <div
            className="relative h-screen content-center bg-[#F7F7F7]">
            <Form {...resetPasswordForm}>
                <Card className="relative bg-white pl-6 pr-6 pb-6 shadow-md w-11/12 max-w-md z-10 m-auto rounded-3xl border border-[#EBEBEB]">
                    <img
                        src="/images/authentication/All.png"
                        alt="Character logo"
                        className="w-[8.125rem] h-[8.3125rem] object-cover object-top absolute top-[-8.3125rem] left-1/2 transform -translate-x-1/2"
                    />
                    
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl flex gap-2 items-center justify-center">
                            <p className="text-[#171717]">{translation("resetPasswordCardTitle")}</p>
                        </CardTitle>
                        <CardDescription className="text-center text-[#5C5C5C]">
                            {translation("resetPasswordCardDesc")}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                        <form>
                            <div className="flex flex-col">
                                <div className="grid gap-2 mb-2">
                                    <FormField
                                        control={resetPasswordForm.control}
                                        name="new_password"
                                        render={({ field }) => (
                                            <InputField
                                                className="h-10 rounded-[10px] border border-[#EBEBEB]"
                                                field={{
                                                    ...field,
                                                    onChange: (e) => {
                                                        field.onChange(e);
                                                        setCurrentPassword(e.target.value);
                                                        resetPasswordForm.trigger("retype_password");
                                                    },
                                                }}
                                                label={translation("newPasswordLabel")}
                                                name="new_password"
                                                type="password"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2 mb-2">
                                    <FormField
                                        control={resetPasswordForm.control}
                                        name="retype_password"
                                        render={({ field }) => (
                                            <InputField
                                                className="h-10 rounded-[10px] border border-[#EBEBEB]"
                                                field={{
                                                    ...field,
                                                    onChange: (e) => {
                                                        field.onChange(e);
                                                        setRetypePassword(e.target.value);
                                                        resetPasswordForm.trigger("retype_password");
                                                    },
                                                }}
                                                label={translation("retypePasswordLabel")}
                                                name="retype_password"
                                                type="password"
                                            />
                                        )}
                                    />
                                </div>
                                <div
                                    className="text-sm text-[#5C5C5C]">
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
                                                                ? "#FB3748" // red
                                                                : passwordStrength === 2
                                                                    ? "#F59E0B" // yellow
                                                                    : "#22C55E" // green
                                                            : "#EBEBEB", // gray
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Criteria check */}
                                    <div className="mt-2 flex flex-col gap-1 text-sm">
                                        {translation("passwordMustContain")}
                                        {passwordCriteria.map((criterion, idx) => {
                                            const passed = criterion.test(currentPassword);
                                            return (
                                                <div key={idx} className="flex items-center gap-2">
                                                    {passed ? (
                                                        <CheckCircle2 size={16} className="text-green-500" />
                                                    ) : (
                                                        <XCircle size={16} className="text-gray-400" />
                                                    )}
                                                    <span style={{ color: passed ? '#22C55E' : '#5C5C5C' }}>
                                                        {criterion.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={!isValidForm}
                                    className="w-full mt-4"
                                    style={{
                                        backgroundColor: isValidForm ? "#7D52F4" : "#D1D5DB",
                                        cursor: isValidForm ? "pointer" : "not-allowed"
                                    }}
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

export default ResetPassword;