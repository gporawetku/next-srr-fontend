import { useQuery } from "@tanstack/react-query";
import api from "@/servers";

interface InterestsProps {
  params?: {
    id?: any;
    search?: any;
    page?: any;
    limit?: any;
    order_by?: any;
    sort?: any;
  };
}

export const useInterests = ({ params }: InterestsProps = {}) => {
  return useQuery({
    queryKey: ["interests", params],
    queryFn: () => api.interests.all({ params }).then((response: any) => response.data),
    staleTime: Infinity,
  });
};

export const useInterestShow = (id: any) => {
  return useQuery({
    queryKey: ["interest", id],
    queryFn: () => api.interests.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
