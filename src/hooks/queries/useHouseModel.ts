import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/servers";
import { useProjects, useProjectShow } from "./useProject";

interface HouseModelsProps {
  params?: {
    id?: any;
    search?: any;
    page?: any;
    limit?: any;
    order_by?: any;
    sort?: any;
  };
}

export const useHouseModels = (projectId: any, { params }: HouseModelsProps) => {
  const queryClient = useQueryClient();
  const project = useProjectShow(projectId);

  return useQuery({
    queryKey: ["houseModels", projectId, params],
    queryFn: () => api.houseModels.all(projectId, { params }).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!projectId,
    select(data) {
      const images = data?.images?.length > 0 ? data?.images : project?.data?.images;
      const house_type_items = data?.house_type_items?.length > 0 ? data?.house_type_items : project?.data?.house_type_items;
      const area_items = data?.area_items?.length > 0 ? data?.area_items : project?.data?.area_items;
      const facilities_items = data?.facilities_items?.length > 0 ? data?.facilities_items : project?.data?.facilities_items;
      const house_models = data?.house_models?.map((val: any) => {
        return {
          ...val,
          projectName: data?.name || "",
          project: project?.data || "",
        };
      });

      const newSelect = {
        ...data,
        images,
        house_type_items,
        area_items,
        facilities_items,
        house_models,
      };
      return newSelect || null;
    },
  });
};

export const useHouseModelShow = (id: any) => {
  return useQuery({
    queryKey: ["houseModel", id],
    queryFn: () => api.houseModels.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
  });
};

export const useProjectHouseModelShow = (projectId: any, id: any) => {
  const project = useProjectShow(projectId);

  return useQuery({
    queryKey: ["houseModel", id],
    queryFn: () => api.houseModels.show(id).then((response: any) => response.data),
    staleTime: Infinity,
    enabled: !!id,
    select(data) {
      const newSelect = {
        ...data,
        project: project?.data,
      };
      return newSelect;
    },
  });
};

export const useHouseModelOptions = () => {
  return useQuery({
    queryKey: ["houseModelOptions"],
    queryFn: () => api.houseModels.options().then((response: any) => response.data),
    staleTime: Infinity,
  });
};
