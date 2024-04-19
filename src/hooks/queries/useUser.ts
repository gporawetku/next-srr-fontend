import { useQuery } from "@tanstack/react-query";
import api from "@/servers";

interface PromotionsProps {
  params?: {
    id?: any;
    search?: any;
    page?: any;
    limit?: any;
    order_by?: any;
    sort?: any;
  };
}

export const useUsers = ({ params }: PromotionsProps = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => api.users.all({ params }).then((response: any) => response.data),
    staleTime: Infinity,
  });
};

export const useUserShow = (id: any) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => api.users.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
