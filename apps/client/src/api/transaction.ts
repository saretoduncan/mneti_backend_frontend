import type {
  IMinimumWalletAmountReponse,
  ITotalReferalReponse,
  IWalletResponse,
  IWithdrawRequest,
} from "@/commons/interfaces/transactions.interface";
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
export const getWalletBalance = async (
  userProfileId: string,
  accessToken: string
): Promise<IWalletResponse> => {
  const res = await apiWithInterceptor.get(
    `/wallet/balance?userProfileId=${userProfileId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
export const getMinimumWithDrawalAmount = async (
  accessToken: string
): Promise<IMinimumWalletAmountReponse> => {
  const res = await apiWithInterceptor.get(
    "/transaction-config/minimumWalletAmount",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

export const getTotalReferals = async (
  userProfileId: string,
  accessToken: string
): Promise<ITotalReferalReponse> => {
  const res = await apiWithInterceptor.get(
    `/users/totalReferals?userProfileId=${userProfileId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
export const withdrawRequest = async (
  withdrawReq: IWithdrawRequest,
  accessToken: string
): Promise<void> => {
  const res = await apiWithInterceptor.post(
    "/transactions/withdraw",
    withdrawReq,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
