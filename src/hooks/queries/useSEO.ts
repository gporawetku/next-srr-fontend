import { useQuery } from "@tanstack/react-query";
import api from "@/servers";

export const useSEOShow = (id: any) => {
  return useQuery({
    queryKey: ["seo", id],
    queryFn: () => api.seo.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};
