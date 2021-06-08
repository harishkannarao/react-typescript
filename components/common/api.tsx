import axios, { AxiosResponse } from 'axios';

export function executeGet<R = any>(url: string, queryParams: URLSearchParams, timeoutMillis: number = 1000): Promise<AxiosResponse<R>> {
    return axios.get(url, {params: queryParams, timeout: timeoutMillis});
};

export function executePost<T = any, R = any>(url: any, data: T, timeoutMillis: number = 1000): Promise<AxiosResponse<R>> {
  return axios.post(url, data, {timeout: timeoutMillis});
};

export function executeDelete<T = any, R = any>(url: any, data: T, timeoutMillis: number = 1000): Promise<AxiosResponse<R>> {
  return axios.delete(url, {data: data, timeout: timeoutMillis});
};