import { useQuery } from "@tanstack/react-query";
import api from "@/servers";

interface BannersProps {
  params?: {
    id?: any;
    search?: any;
    page?: any;
    limit?: any;
    order_by?: any;
    sort?: any;
  };
}

export const useBanners = ({ params }: BannersProps = {}) => {
  return useQuery({
    queryKey: ["banners", params],
    queryFn: () => api.banners.all({ params }).then((response: any) => response.data),
    staleTime: Infinity,
  });
};

export const useBannerShow = (id: any) => {
  return useQuery({
    queryKey: ["banner", id],
    queryFn: () => api.banners.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
