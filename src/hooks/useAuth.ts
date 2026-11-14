import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAxios from "@/url/useAxios";
import type { AuthUser } from "@/app/dashboard/UserContext";

export const useCurrentUser = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axios.get("/auth/me");
      return res.data.user as NonNullable<AuthUser>;
    },
    retry: false,
    meta: { silent: true },
  });
};

export const useLogout = () => {
  const axios = useAxios();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post("/auth/logout"),
    onSettled: () => {
      queryClient.clear();
      router.replace("/login");
    },
  });
};