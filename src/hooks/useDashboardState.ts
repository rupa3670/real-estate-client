import { useQuery } from "@tanstack/react-query";
import useAxios from "@/url/useAxios";

export type ExpensePoint = { name: string; budget: number; expense: number };
export type StatusPoint = { status: string; value: number };

export type DashboardStats = {
  users: number;
  projects: number;
  mesons: number;
  overBudget: number;
  pendingRequests: number;
  projectStatus: StatusPoint[];
  expenseByProject: ExpensePoint[];
};

export type DashboardData = {
  stats: DashboardStats;
};

export const useDashboardStats = (enabled: boolean) => {
  const axios = useAxios();

  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async (): Promise<DashboardData> => {
      const res = await axios.get("/dashboard/stats");
      return { stats: res.data.stats };
    },
    enabled,
    retry: false,
  });
};