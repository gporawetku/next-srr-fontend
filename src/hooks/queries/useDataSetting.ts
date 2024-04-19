import { useQuery } from "@tanstack/react-query";
import api from "@/servers";


export const useDataSettingShow = (id: any) => {
  return useQuery({
    queryKey: ["dataSetting", id],
    queryFn: () => api.dataSetting.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};

