import { serverApi } from "./axios";

export interface MyRecipientRevealStatusResponse {
  hasRevealedRecipient: boolean;
}

export const getMyRecipientRevealStatus = async (): Promise<MyRecipientRevealStatusResponse> => {
  const response = await serverApi.get(
    `/christmas-draw/my-recipient/reveal-status`
  );
  return response.data;
};
