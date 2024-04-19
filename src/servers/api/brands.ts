import { AxiosRequestConfig } from "axios";
import { api } from "@/libs/axios";

const url: string = "/brands";

const all = (config?: AxiosRequestConfig) => {
  return api.get(url, config);
};

const store = (data?: any, config?: AxiosRequestConfig) => {
  return api.post(url + "/create", data, config);
};

const update = (id?: any, data?: any, config?: AxiosRequestConfig) => {
  return api.patch(url + "/update/" + id, data, config);
};

const show = (id?: any, config?: AxiosRequestConfig) => {
  return api.get(url + "/" + id, config);
};

const destroy = (id?: any, config?: AxiosRequestConfig) => {
  return api.delete(url + "/" + id, config);
};

export { all, store, update, show, destroy };
