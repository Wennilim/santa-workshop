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

export type TRequestBody = {
  email: string;
  password: string;
  name: string;
  gender: Gender;
  department: Department;
};

export const postRegister = async (body: TRequestBody) => {
  const response = await serverApi.post(`/auth/register`, body);
  return response.data;
};
