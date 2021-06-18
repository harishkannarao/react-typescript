import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { listCustomers, deleteCustomer } from "../../components/common/customer";
import * as queryParamModule from "../../components/common/query_param"
import { CustomerModel, CustomerList } from "../../components/customer/customer";
import { DisplayError } from "../../components/error/error";
import { AxiosError, AxiosResponse } from 'axios';


export function CustomersListPage() {
    const router: NextRouter = useRouter();
    const [title, setTitle] = useState<string>('List - Customers');
    const [inputFirstName, setInputFirstName] = useState<string>('');
    const [firstNameTypingTimeout, setFirstNameTypingTimeout] = useState<any>(undefined);
    const [error, setError] = useState<Error | AxiosError<any> | undefined>(undefined);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [data, setData] = useState<CustomerModel[]>([]);

    function errorHandler(httpError: Error | AxiosError<any>) {
        setIsProcessing(false);
        setError(httpError);
    }

    function fetchData(firstName: string | null) {
        setIsProcessing(true);
        const successHandler = (result: AxiosResponse<CustomerModel[]>) => {
            setIsProcessing(false);
            setData(result.data);
            setError(undefined);
        }
        listCustomers(firstName, successHandler, errorHandler);
    }

    function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (firstNameTypingTimeout) {
            clearTimeout(firstNameTypingTimeout);
            setFirstNameTypingTimeout(undefined);
        }
        setInputFirstName(event.target.value);
        setFirstNameTypingTimeout(setTimeout(() => {
            fetchData(event.target.value.trim());
        }, 500));
        updateTitle(event.target.value);
        updateUrl(event.target.value);
    }

    function updateTitle(firstName: string) {
        if (firstName.trim() != '') {
            setTitle(firstName + " :: " + 'List - Customers');
        } else {
            setTitle('List - Customers');
        }
    }

    function updateUrl(firstName: string) {
        let query = router.query;
        if (firstName.trim() == '') {
            delete query['firstName'];
        } else {
            query['firstName'] = firstName;
        }
        const url = {
            'pathname': router.pathname,
            'query': query
        }
        router.push(url, undefined, { shallow: true });
    }

    function handleDeleteCustomer(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        setIsProcessing(true);
        const successHandler = (_result: any) => {
            fetchData(inputFirstName.trim());
        }
        const data = { 'id': Number(event.currentTarget.getAttribute('data-id')) }
        deleteCustomer(data, successHandler, errorHandler)
    }

    useEffect(() => {
        let firstName: string | null = queryParamModule.getParameterByName("firstName");
        if (firstName != null) {
            setInputFirstName(firstName);
            updateTitle(firstName);
        }
        fetchData(firstName);
        return () => {
            if (firstNameTypingTimeout) {
                clearTimeout(firstNameTypingTimeout);
            }
        };
    }, []);

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <h3>
                <Link href="/">
                    <a data-testid="home-link">Home</a>
                </Link>
            </h3>
            <h3>
                <Link href="/customers/new/">
                    <a data-testid="new-customer-link">New - Customer</a>
                </Link>
            </h3>
            {
                !isProcessing && error &&
                <DisplayError error={error} />
            }
            <label>
                First Name:
                        <input data-testid="input-first-name" name="inputFirstName" type="text"
                    value={inputFirstName}
                    onChange={handleFirstNameChange} />
            </label>
            <CustomerList router={router} isProcessing={isProcessing} handleDeleteCustomer={handleDeleteCustomer} data={data} />
        </div>
    )
}

export default CustomersListPage;