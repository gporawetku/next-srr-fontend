import { useQuery } from "@tanstack/react-query";
import api from "@/servers";

interface ActivitiesProps {
  params?: {
    id?: any;
    search?: any;
    page?: any;
    limit?: any;
    order_by?: any;
    sort?: any;
  };
}

export const useActivities = ({ params }: ActivitiesProps = {}) => {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: () => api.activities.all({ params }).then((response: any) => response.data),
    staleTime: Infinity,
  });
};

export const useActivitieShow = (id: any) => {
  return useQuery({
    queryKey: ["activitie", id],
    queryFn: () => api.activities.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
