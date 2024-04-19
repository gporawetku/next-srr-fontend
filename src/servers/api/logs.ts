import axios, { AxiosRequestConfig } from "axios";
import { api } from "@/libs/axios";

const url: string = "/activityLogs";

const all = (config?: AxiosRequestConfig) => {
  return api.get(url, config);
};

export { all };