import { serverApi } from "./axios";

export const getMyGiftCode = async () => {
  const response = await serverApi.get("/christmas-draw/my-giftcode");
  return response.data;
};
