import { STATUS_CODE } from ".";

export interface ResponseSignIn {
  status_code: STATUS_CODE;
  message: string;
  user_data: UserData;
  access_token: string;
  refresh_token: string;
}

export interface UserData {
  id: string;
  user_name: string;
  email: string;
  email_verified: string;
  active: string;
}

export interface ChangePassword {
  email: string
  new_password: string
  reset_code: string
}