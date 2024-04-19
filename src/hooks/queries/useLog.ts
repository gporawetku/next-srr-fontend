import { useQuery } from "@tanstack/react-query";
import api from "@/servers";


export const useLogs = () => {
    return useQuery({
      queryKey: ["logs"],
      queryFn: () => api.logs.all().then((response: any) => response.data),
      staleTime: Infinity,
    });
  };