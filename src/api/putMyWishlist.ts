import { serverApi } from "./axios";

export const putMyWishlist = async (id: number, name: string) => {
  const response = await serverApi.put(`/my-wishlist/${id}`, { name });
  return response.data;
};
