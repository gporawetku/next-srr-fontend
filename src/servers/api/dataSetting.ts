import { AxiosRequestConfig } from "axios";
import { api } from "@/libs/axios";

const url: string = "/data_setting";

const update = (id?: any, data?: any, config?: AxiosRequestConfig) => {
  return api.patch(url + "/update/" + id, data, config);
};

const show = (id?: any, config?: AxiosRequestConfig) => {
  return api.get(url + "/" + id, config);
};

export { update, show };

export async function uploadFiles(data: any, config?: AxiosRequestConfig) {
  const response = await api.post("/files/upload", data, config);
  return response?.data || [];
}
