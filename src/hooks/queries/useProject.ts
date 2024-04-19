
import { useQuery } from "@tanstack/react-query";
import api from "@/servers";

interface ProjectsProps {
  params?: {
    id?: any;
    search?: any;
    page?: any;
    limit?: any;
    order_by?: any;
    sort?: any;
  };
}

export const useProjects = ({ params }: ProjectsProps = {}) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => api.projects.all({ params }).then((response: any) => response.data),
    staleTime: Infinity,
  });
};

export const useProjectShow = (id: any) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => api.projects.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
