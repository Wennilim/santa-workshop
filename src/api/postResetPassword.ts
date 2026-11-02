import { serverApi } from "./axios";

export type TResetPasswordRequestBody = {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const postResetPassword = async (body: TResetPasswordRequestBody) => {
  const response = await serverApi.post(`/auth/resetPassword`, body);
  return response.data;
};
