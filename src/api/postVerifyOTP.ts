import { serverApi } from "./axios";

export type TVerifyOTPRequestBody = {
  email: string;
  otp: string;
};

export const postVerifyOTP = async (body: TVerifyOTPRequestBody) => {
  const response = await serverApi.post(`/auth/verifyOTP`, body);
  return response.data;
};
