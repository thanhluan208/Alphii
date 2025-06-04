import userService from "@/services/user.service";
import { ChangePassword } from "@/types/authentication.type";
import { useMutation } from "@tanstack/react-query";

const useMutateAuthentication = () => {
  const handleVerifyEmail = useMutation({
    mutationFn: (email: string) => userService.verifyEmail(email),
  });

  const handleSubmitOTP = useMutation({
    mutationFn: (payload: { email: string; otp: string }) =>
      userService.submitOTP(payload.email, payload.otp),
  });

  const handleLogin = useMutation({
    mutationFn: (payload: { email_or_username: string; password: string }) =>
      userService.login(payload),
  });

  const handleLogout = useMutation({
    mutationFn: (payload: {
      email_or_username: string;
      token: string;
      refreshToken: string;
    }) =>
      userService.logout(
        payload.email_or_username,
        payload.token,
        payload.refreshToken
      ),
  });

  const handleSignUp = useMutation({
    mutationFn: (payload: FormData) => userService.signUp(payload),
  });

  const handleForgotPass = useMutation({
    mutationFn: (payload: { email: string }) =>
      userService.forgotPass( payload.email),
  });

  const handleChangePass = useMutation({
    mutationFn: (payload: ChangePassword) => userService.changePass(payload),
  });

  return {
    handleVerifyEmail,
    handleSubmitOTP,
    handleLogin,
    handleLogout,
    handleSignUp,
    handleForgotPass,
    handleChangePass,
  };
};

export default useMutateAuthentication;
