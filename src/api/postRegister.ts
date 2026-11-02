import { serverApi } from "./axios";

type Gender = "male" | "female";
type Department =
  | "frontend"
  | "backend"
  | "ai"
  | "rnd"
  | "bqa"
  | "operation"
  | "design"
  | "management";

export type TRegisterRequestBody = {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  department: Department;
};

export const postRegister = async (body: TRegisterRequestBody) => {
  const response = await serverApi.post(`/auth/register`, body);
  return response.data;
};
