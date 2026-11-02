import { serverApi } from "./axios";

export const postMyWishlist = async (wishlist: string) => {
  const response = await serverApi.post("/my-wishlist", { name: wishlist });
  return response.data;
};