import { useQuery } from "@tanstack/react-query";
import api from "@/servers";

interface BrandsProps {
  params?: {
    id?: any;
    search?: any;
    page?: any;
    limit?: any;
    order_by?: any;
    sort?: any;
  };
}

export const useBrands = ({ params }: BrandsProps = {}) => {
  return useQuery({
    queryKey: ["brands", params],
    queryFn: () => api.brands.all({ params }).then((response: any) => response.data),
    staleTime: Infinity,
  });
};

export const useBrandShow = (id: any) => {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => api.brands.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
