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

export const usePromotions = ({ params }: PromotionsProps = {}) => {
  return useQuery({
    queryKey: ["promotions", params],
    queryFn: () => api.promotions.all({ params }).then((response: any) => response.data),
    staleTime: Infinity,
  });
};

export const usePromotionShow = (id: any) => {
  return useQuery({
    queryKey: ["promotion", id],
    queryFn: () => api.promotions.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
