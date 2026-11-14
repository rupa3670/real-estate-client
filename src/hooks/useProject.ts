import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/url/useAxios";

export type ProjectStatus = "planned" | "running" | "on_hold" | "completed";

export type ListProject = {
  _id: string;
  name: string;
  location: string;
  description?: string;
  estimatedBudget: number;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  manager: { _id: string; name: string; email: string } | null;
};

export type NewProject = {
  name: string;
  location: string;
  description: string;
  estimatedBudget: number;
  manager: string;
  startDate: string;
  endDate: string;
};

const PROJECTS_KEY = ["projects"];

export const useProjects = (enabled = true) => {
  const axios = useAxios();

  return useQuery({
    queryKey: PROJECTS_KEY,
    queryFn: async () => {
      const res = await axios.get("/projects");
      return res.data.projects as ListProject[];
    },
    enabled,
    retry: false,
  });
};

export const useCreateProject = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: NewProject) => {
      const res = await axios.post("/projects", body);
      return res.data.project as ListProject;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};