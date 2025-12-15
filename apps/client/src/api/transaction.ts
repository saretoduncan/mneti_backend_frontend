import { apiWithInterceptor } from "./client.api";

export const subscribe = async (
  phoneNumber: string,
  accessToken: string,
  userProfileId: string
): Promise<void> => {
  const res = await apiWithInterceptor.post(
    "transactions/subscribe",
    {
      phoneNumber,
      userProfileId: userProfileId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
