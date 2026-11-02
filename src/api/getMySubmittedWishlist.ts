import { serverApi } from "./axios";

export const getMySubmittedWishlist = async () => {
  const response = await serverApi.get("send-wishlist");
  return response.data;
};
