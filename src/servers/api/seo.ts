import { AxiosRequestConfig } from "axios";
import { api } from "@/libs/axios";

const url: string = "/seo";

const update = (id?: any, data?: any, config?: AxiosRequestConfig) => {
  return api.patch(url + "/update/" + id, data, config);
};

const show = (id?: any, config?: AxiosRequestConfig) => {
  return api.get(url + "/" + id, config);
};

export { update, show };
