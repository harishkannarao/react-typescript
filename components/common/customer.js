import { executeGet, executePost, executeDelete } from "./api";

export function listCustomers(firstName, successHandler, errorHandler) {
    const query = {};
    if (firstName != null && firstName != '') {
        query['firstName'] = firstName;
    }
    executeGet(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", 
        query, 
        successHandler, 
        errorHandler
    );
}

export function createCustomer(data, successHandler, errorHandler) {
    executePost(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", 
        data, 
        successHandler, 
        errorHandler
    );
}

export function deleteCustomer(data, successHandler, errorHandler) {
    executeDelete(
        process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", 
        data, 
        successHandler, 
        errorHandler
    );
}