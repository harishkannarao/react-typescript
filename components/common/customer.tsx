import { AxiosError, AxiosResponse } from "axios";
import { CustomerModel } from "../customer/customer";
import { executeGet, executePost, executeDelete } from "./api";

export function listCustomers(firstName: string | null, successHandler: (res: AxiosResponse<CustomerModel[]>) => void, errorHandler: (err: Error | AxiosError<any>) => void) {
    const query = new URLSearchParams();
    if (firstName != null && firstName != '') {
        query.append('firstName', firstName);
    }
    executeGet(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers",
        query)
        .then(successHandler)
        .catch(errorHandler);
}

export function createCustomer(data: { firstName: string; lastName: string; }, successHandler: (res: AxiosResponse<any>) => void, errorHandler: (err: Error | AxiosError<any>) => void) {
    executePost(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers",
        data)
        .then(successHandler)
        .catch(errorHandler);
}

export function deleteCustomer(data: { id: number }, successHandler: (res: AxiosResponse<any>) => void, errorHandler: (err: Error | AxiosError<any>) => void) {
    executeDelete(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers",
        data)
        .then(successHandler)
        .catch(errorHandler);
}