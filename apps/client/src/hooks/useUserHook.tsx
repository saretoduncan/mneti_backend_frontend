import { useQuery, useQueryClient } from "@tanstack/react-query";

import useAuthHook from "./useAuthHook";

import { getUser } from "@/api/auth";
import type { IUserResponse } from "@/commons/interfaces/auth.interface";

const useUserHook = () => {
  const { accessToken, userId } = useAuthHook();
  const queryClient = useQueryClient();
  const user: IUserResponse | undefined = queryClient.getQueryData(["user"]);
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User id not found");
      }
      return await getUser(userId, accessToken ?? "");
    },
    enabled: false,
    staleTime: Infinity,
  });
  return { user, ...query };
};

export default useUserHook;
