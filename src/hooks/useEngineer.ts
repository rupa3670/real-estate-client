import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/url/useAxios";

export type ListEngineer = {
  _id: string;
  name: string;
  phone: string;
  monthlySalary: number;
  isActive: boolean;
  createdAt: string;
};

export type EngineerInput = {
  name: string;
  phone: string;
  monthlySalary: number;
};

const KEY = ["engineers"];

export const useEngineers = (enabled = true) => {
  const axios = useAxios();

  return useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const res = await axios.get("/engineers");
      return res.data.data as ListEngineer[];
    },
    enabled,
    retry: false,
  });
};

export const useEngineer = (id: string) => {
  const axios = useAxios();

  return useQuery({
    queryKey: [...KEY, id],
    queryFn: async () => {
      const res = await axios.get(`/engineers/${id}`);
      return res.data.data as ListEngineer;
    },
    enabled: !!id,
    retry: false,
  });
};

export const useCreateEngineer = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: EngineerInput) => {
      const res = await axios.post("/engineers", body);
      return res.data.data as ListEngineer;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
};

export const useUpdateEngineer = (id: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: EngineerInput) => {
      const res = await axios.put(`/engineers/${id}`, body);
      return res.data.data as ListEngineer;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
};

export const useDeleteEngineer = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/engineers/${id}`);
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });
};