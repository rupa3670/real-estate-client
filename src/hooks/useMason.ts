import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/url/useAxios";

export type ListMeson = {
  _id: string;
  name: string;
  phone: string;
  dailyWage: number;
  isActive: boolean;
  createdAt: string;
};

export type MesonInput = {
  name: string;
  phone: string;
  dailyWage: number;
};

const KEY = ["mesons"];
const BASE = "/mesons";

export const useMesons = (enabled = true) => {
  const axios = useAxios();

  return useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const res = await axios.get(BASE);
      return res.data.data as ListMeson[];
    },
    enabled,
    retry: false,
  });
};

export const useMeson = (id: string) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...KEY, id],
    queryFn: async () => {
      const res = await axios.get(`${BASE}/${id}`);
      return res.data.data as ListMeson;
    },
    enabled: !!id,
    retry: false,
  });
};

export const useCreateMeson = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: MesonInput) => {
      const res = await axios.post(BASE, body);
      return res.data.data as ListMeson;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
};

export const useUpdateMeson = (id: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: MesonInput) => {
      const res = await axios.put(`${BASE}/${id}`, body);
      return res.data.data as ListMeson;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
};

export const useDeleteMeson = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${BASE}/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
};