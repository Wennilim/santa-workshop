import { serverApi } from "./axios";

export const getRecipient = async () => {
  const response = await serverApi.get(`/christmas-draw/my-recipient`);
  return response.data;
};