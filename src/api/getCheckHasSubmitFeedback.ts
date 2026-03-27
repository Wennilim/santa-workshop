import { serverApi } from "./axios";

export const getCheckHasSubmitFeedback = async () => {
  const response = await serverApi.get("/feedback/check");
  return response.data;
};
