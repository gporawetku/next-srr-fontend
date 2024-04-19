import { useQuery } from "@tanstack/react-query";
import api from "@/servers";

interface JobsProps {
  params?: {
    id?: any;
    search?: any;
    page?: any;
    limit?: any;
    order_by?: any;
    sort?: any;
  };
}
export const useJobs = ({ params }: JobsProps = {}) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () =>  api.jobs.all().then((response: any) => response.data.data),
    staleTime: Infinity,
  });
};

export const useJobShow = (id: any) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => api.jobs.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
