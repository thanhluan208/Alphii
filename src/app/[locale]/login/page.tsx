"use client"

import InputField from "@/components/common/fields/InputField";
import { Button } from "@/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Link } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { Routes } from "@/lib/constant"

const Login = () => {
    const translation = useTranslations("authentication")

    const formSchema = z.object({
        email_or_username: z.string().min(2).max(50),
        password: z.string().min(6).max(50),
    });

    const loginForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email_or_username: "",
            password: "",
        },
    });

    const handleGoogleLogIn = (event: React.FormEvent) => {
        event.preventDefault();
        const popup = window.open(Routes.GOOGLE_LOGIN, 'oauth', 'width=500,height=600');

        window.addEventListener("message", (event) => {
            if (event.origin !== Routes.SOCIAL_LOGIN_ORIGIN) {
                console.error("Invalid origin:", event.origin);
                return;
            };

            const accessToken = event.data.access_token;
            const refreshToken = event.data.refresh_token;
            const user_email = event.data.user_data.email;
            // console.log("Received message from popup:", event.data);
            console.log("access_token:", accessToken);
            console.log("refresh_token:", refreshToken);
            console.log("email:", user_email);

            popup?.close();
            // socialLoginProceeding(accessToken, refreshToken, event.data.user_data);
        });
    };

    const handleGithubLogIn = (event: React.FormEvent) => {
        event.preventDefault();
        const popup = window.open(Routes.GITHUB_LOGIN, 'oauth', 'width=500,height=600');

        window.addEventListener("message", (event) => {
            if (event.origin !== Routes.SOCIAL_LOGIN_ORIGIN) {
                console.error("Invalid origin:", event.origin);
                return;
            };

            const accessToken = event.data.access_token;
            const refreshToken = event.data.refresh_token;
            const user_email = event.data.user_data.email;
            // console.log("Received message from popup:", event.data);
            console.log("access_token:", accessToken);
            console.log("refresh_token:", refreshToken);
            console.log("email:", user_email);

            popup?.close();
            // socialLoginProceeding(accessToken, refreshToken, event.data);
        });
    };

    const handleSubmit = async () => {

    };

    const formErr = loginForm.formState.errors;
    const isDirty = loginForm.formState.isDirty;

    return (
        <div
            className="relative h-screen content-center bg-[#F7F7F7]">
            <Form {...loginForm}>
                <Card className="relative bg-white pl-6 pr-6 pb-6 shadow-md w-11/12 max-w-md z-10 m-auto rounded-3xl border border-[#EBEBEB]">
                    <img
                        src="/images/authentication/Yellow.png"
                        alt="Character logo"
                        className="w-24 absolute bottom-24 -left-32"
                    />

                    <img
                        src="/images/authentication/Purple.png"
                        alt="Character logo"
                        className="w-24 absolute bottom-20 -right-32 scale-x-[-1]"
                    />

                    <img
                        src="/images/authentication/Green-n-Blue.png"
                        alt="Character logo"
                        className="w-[8.75rem] h-[4.375rem] object-cover object-top absolute top-[-4.375rem] left-1/2 transform -translate-x-1/2"
                    />

                    <CardHeader className="pb-4 z-20">
                        <CardTitle className="text-xl flex gap-2 items-center justify-center">
                            <p className="text-[#171717]">{translation("loginCardTitle")}</p>
                        </CardTitle>
                        <CardDescription className="text-[#5C5C5C] text-center">
                            {translation("loginCardDesc")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pb-2">
                        <Button
                            className="w-full bg-white text-black h-10 mb-3 shadow-none rounded-[10px] bg-none border border-[#D8D9E0]"
                            onClick={handleGoogleLogIn}>
                            <img
                                src="/images/google.svg"
                                alt="Google logo"
                                className="w-5 h-5 mr-1"
                            />
                            {translation("googleButton")}
                        </Button>

                        <Button
                            className="w-full bg-white text-black h-10 mb-2 shadow-none rounded-[10px] bg-none border border-[#D8D9E0]"
                            onClick={handleGithubLogIn}>
                            <img
                                src="/images/github.png"
                                alt="Github logo"
                                className="w-5 h-5 mr-1"
                            />
                            {translation("githubButton")}
                        </Button>
                    </CardContent>

                    {/* horizontal divider */}
                    <div className="flex items-center">
                        <hr className="flex-grow text-[#EBEBEB]" />
                        <span className="pl-2 pr-2 text-[#62636C] text-xs">{translation("horizontalLine").toUpperCase()}</span>
                        <hr className="flex-grow text-[#EBEBEB]" />
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
                                                className="h-10 rounded-[10px] border border-[#EBEBEB]"
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
                                                className="h-10 rounded-[10px] border border-[#EBEBEB]"
                                                field={field}
                                                label={translation("passwordLabel")}
                                                name="password"
                                                type="password"
                                            />
                                        )}
                                    />
                                </div>
                                <div
                                    className="text-sm mb-3 text-[#5C5C5C]">
                                    {translation("forgotPassword")}{" "}
                                    <Link href={Routes.FORGOT_PASSWORD}
                                        className="font-medium hover:underline text-[#704DFF]"
                                    >
                                        {translation("resetLink")}
                                    </Link>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-[#7D52F4]"
                                    disabled={
                                        !isEmpty(formErr) || !isDirty // || handleSignIn.isLoading 
                                    }
                                >
                                    {translation("loginButton")}
                                </Button>
                            </div>
                            <div className="mt-3 text-center text-sm text-[#5C5C5C]">
                                {translation("noAccount")}{" "}
                                <Link href={Routes.REGISTER}
                                    className="font-medium hover:underline text-[#171717]"
                                >
                                    {translation("registerLink")}
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Form>
        </div>
    );
};

export default Login;