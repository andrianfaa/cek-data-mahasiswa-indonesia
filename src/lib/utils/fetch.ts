/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from "axios";

export const FetchAPI = <T>(url: string, config?: AxiosRequestConfig) => {
  return axios<T>(url, { ...config });
};
