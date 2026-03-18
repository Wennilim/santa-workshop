import { serverApi } from "./axios";

export type TRequestBody = {
  items: Array<{ wish: string; link?: string }>;
};

export const postWishlistToSanta = async (body: TRequestBody) => {
  const response = await serverApi.post("send-wishlist", body);
  return response.data;
};
