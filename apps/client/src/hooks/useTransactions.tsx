import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthHook from "./useAuthHook";
import useUserHook from "./useUserHook";
import {
  getMinimumWithDrawalAmount,
  getTotalReferals,
  getWalletBalance,
} from "@/api/transaction";
import type {
  IMinimumWalletAmountReponse,
  ITotalReferalReponse,
  IWalletResponse,
} from "@/commons/interfaces/transactions.interface";

const useTransactions = () => {
  const { accessToken } = useAuthHook();
  const { user } = useUserHook();
  const queryClient = useQueryClient();
  const balance: IWalletResponse | undefined = queryClient.getQueryData([
    "balance",
  ]);
  const minimumBalance: IMinimumWalletAmountReponse | undefined =
    queryClient.getQueryData(["minimumBalance"]);
  const totalReferals: ITotalReferalReponse | undefined =
    queryClient.getQueryData(["totalReferals"]);
  const balanceQuery = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found");
      }
      return await getWalletBalance(user.profile.id, accessToken ?? "");
    },
    initialData: balance,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 30000,
  });

  const minimumQuery = useQuery({
    queryKey: ["minimumBalance"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found");
      }
      return await getMinimumWithDrawalAmount(accessToken ?? "");
    },
    initialData: minimumBalance,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 30000,
  });
  const totalReferalsQuery = useQuery({
    queryKey: ["totalReferals"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not found");
      }
      return await getTotalReferals(user.profile.id, accessToken ?? "");
    },
    initialData: totalReferals,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 30000,
  });
  return {
    totalReferals,
    balance,
    minimumBalance,
    balanceQuery,
    minimumQuery,
    totalReferalsQuery,
  };
};

export default useTransactions;
