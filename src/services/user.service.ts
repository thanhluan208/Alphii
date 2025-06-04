import { api } from "@/helpers";
import { changePassword, forgotPass, getAvatar, getUserData, logout, refreshToken, searchUser, signInApi, signUpApi, submitOTP, updateUser, uploadAvatar, verifyEmail } from "@/lib/constant";
import { DefaultResponse } from "@/types";
import { ChangePassword, ResponseSignIn as ResponseLogin, UserData } from "@/types/authentication.type";


class UserService {
  getUserData(id: string): Promise<DefaultResponse & UserData> {
    return api
      .post(getUserData, {
        user_id: id,
      })
      .then((response) => response.data);
  }

  getListUser(search?: string) {
    return api.post(searchUser, {
      search_filter: search || "",
    });
  }

  signUp(data: FormData): Promise<DefaultResponse & unknown> {
    return api.post(signUpApi, data).then((res) => res.data);
  }

  verifyEmail(email: string): Promise<DefaultResponse & unknown> {
    return api
      .post(verifyEmail, {
        email: email,
      })
      .then((res) => res.data);
  }

  submitOTP(email: string, otp: string): Promise<DefaultResponse & unknown> {
    return api
      .post(submitOTP, {
        email: email,
        verification_code: otp,
      })
      .then((res) => res.data);
  }

  login(data: {
    email_or_username: string;
    password: string;
  }): Promise<ResponseLogin> {
    return api
      .post(signInApi, data)
      .then((response) => response?.data);
  }

  refreshToken(email: string) {
    return api.post(refreshToken, {
      email_or_username: email,
    });
  }

  logout(email_or_username: string, token: string, refreshToken: string) {
    return api.post(logout, {
      email_or_username: email_or_username,
      access_token: token,
      refresh_token: refreshToken,
    });
  }

  forgotPass(email: string): Promise<DefaultResponse&any> {
    return api
      .post(forgotPass, {
        email,
      })
      .then((res) => res.data);
  }

  changePass(payload: ChangePassword): Promise<DefaultResponse&any> {
    return api.post(changePassword, payload).then((res) => res.data);
  }
  getAvatar(id: string): Promise<DefaultResponse&{ avatar_url: string }> {
    return api
      .post(getAvatar, {
        user_id: id,
      })
      .then((response) => response.data);
  }

  uploadAvatar(formData: FormData): Promise<DefaultResponse&UserData> {
    return api
      .post(uploadAvatar, formData)
      .then((response) => response.data);
  }

}

export default new UserService();
