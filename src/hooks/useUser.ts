import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/url/useAxios";
import type { ListUser } from "@/components/UsersTable";

export type NewUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

const USERS_KEY = ["users"];

export const useUsers = (enabled = true) => {
  const axios = useAxios();

  return useQuery({
    queryKey: USERS_KEY,
    queryFn: async () => {
      const res = await axios.get("/users");
      return res.data.users as ListUser[];
    },
    enabled,
    retry: false,
  });
};

export const useCreateUser = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: NewUser) => {
      const res = await axios.post("/users", body);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  });
};

export const useToggleUserStatus = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (target: ListUser) => {
      const res = await axios.patch(`/users/${target._id}/status`, {
        isActive: !target.isActive,
      });
      return res.data.user as ListUser;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  });
};