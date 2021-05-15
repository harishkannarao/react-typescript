import axios, { AxiosResponse } from 'axios';
import { HttpError } from '../model/http_error';

export function executeGet<R = any, ER = any>(url: string, queryParams: URLSearchParams, successHandler: (res: AxiosResponse<R>) => void, errorHandler: (err: HttpError<ER>) => void) {
    axios.get(url, {params: queryParams, timeout: 1000})
      .then(successHandler)
      .catch(errorHandler);
};

export function executePost<T = any, R = any, ER = any>(url: any, data: T, successHandler: (res: AxiosResponse<R>) => void, errorHandler: (err: HttpError<ER>) => void) {
    axios.post(url, data, {timeout: 1000})
      .then(successHandler)
      .catch(errorHandler);
};

export function executeDelete<T = any, R = any, ER = any>(url: any, data: T, successHandler: (res: AxiosResponse<R>) => void, errorHandler: (err: HttpError<ER>) => void) {
    axios.delete(url, {data: data, timeout: 1000})
      .then(successHandler)
      .catch(errorHandler);
};