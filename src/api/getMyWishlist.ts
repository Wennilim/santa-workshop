import { serverApi } from "./axios";

export const getMyWishlist = async () => {
  const response = await serverApi.get("/my-wishlist");
  return response.data;
};
