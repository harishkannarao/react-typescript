import axios, { AxiosError, AxiosResponse } from 'axios';

export function executeGet<R = any, ER = any>(url: string, queryParams: URLSearchParams, successHandler: (res: AxiosResponse<R>) => void, errorHandler: (err: Error | AxiosError<ER>) => void, timeoutMillis: number = 1000) {
    axios.get(url, {params: queryParams, timeout: timeoutMillis})
      .then(successHandler)
      .catch(errorHandler);
};

export function executePost<T = any, R = any, ER = any>(url: any, data: T, successHandler: (res: AxiosResponse<R>) => void, errorHandler: (err: Error | AxiosError<ER>) => void, timeoutMillis: number = 1000) {
    axios.post(url, data, {timeout: timeoutMillis})
      .then(successHandler)
      .catch(errorHandler);
};

export function executeDelete<T = any, R = any, ER = any>(url: any, data: T, successHandler: (res: AxiosResponse<R>) => void, errorHandler: (err: Error | AxiosError<ER>) => void, timeoutMillis: number = 1000) {
    axios.delete(url, {data: data, timeout: timeoutMillis})
      .then(successHandler)
      .catch(errorHandler);
};