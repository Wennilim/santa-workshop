import { serverApi } from "./axios";

export type TFeedbackRequestBody = {
  overall_satisfaction: number;
  gift_satisfaction_level: number;
  games_activities: number;
  event_catering: number;
  future_expectation: string;
};

export const postFeedback = async (payload: TFeedbackRequestBody) => {
  const response = await serverApi.post("/feedback", payload);
  return response.data;
};
