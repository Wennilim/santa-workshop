import { serverApi } from "./axios";

export const getRulesAgenda = async () => {
  const response = await serverApi.get("/event-config");
  return response.data;
};
