import { serverApi } from "./axios";

export const getRevealStatus = async () => {
  const response = await serverApi.get(`/christmas-draw/get-reveal-status`);
  return response.data;
};
