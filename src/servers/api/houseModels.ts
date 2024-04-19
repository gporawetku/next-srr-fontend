import axios, { AxiosRequestConfig } from "axios";
import { api } from "@/libs/axios";

const url: string = "/house_models";

const all = (id: any, config?: AxiosRequestConfig) => {
  return api.get("/projects/" + id + "/house_models", config);
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

const options = (config?: AxiosRequestConfig) => {
  return api.get(url + "/all", config);
};

export { all, store, update, show, destroy, options };
