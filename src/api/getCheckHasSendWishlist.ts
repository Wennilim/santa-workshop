import { serverApi } from "./axios";

export const getCheckHasSendWishlist = async () => {
  const response = await serverApi.get("/send-wishlist/check");
  return response.data;
};