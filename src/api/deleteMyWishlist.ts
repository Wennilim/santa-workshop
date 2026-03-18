import { serverApi } from "./axios";

export const deleteMyWishlist = async (id: number) => {
  const response = await serverApi.delete(`/my-wishlist/${id}`);
  return response.data;
};