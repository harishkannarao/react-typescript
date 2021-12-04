import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  headers: {'X-Custom-Header': 'foo-bar'}
});

export function executeGet<R = any>(url: string, queryParams?: URLSearchParams, timeoutMillis: number = 1000): Promise<AxiosResponse<R>> {
    return instance.get(url, {params: queryParams, timeout: timeoutMillis});
};

export function executePost<T = any, R = any>(url: any, data?: T, timeoutMillis: number = 1000): Promise<AxiosResponse<R>> {
  return instance.post(url, data, {timeout: timeoutMillis});
};

export function executeDelete<T = any, R = any>(url: any, data?: T, timeoutMillis: number = 1000): Promise<AxiosResponse<R>> {
  return instance.delete(url, {data: data, timeout: timeoutMillis});
};