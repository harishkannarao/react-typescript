import React, { useState } from 'react';
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import { createCustomer } from '../../components/common/customer'
import { DisplayError } from "../../components/error/error";
import { AxiosError } from 'axios';

export function NewCustomerPage() {
    const router: NextRouter = useRouter();
    const [error, setError] = useState<Error | AxiosError<any> | undefined>(undefined);
    const [inputFirstName, setInputFirstName] = useState<string>('');
    const [inputLastName, setInputLastName] = useState<string>('');
    const [submittingData, setSubmittingData] = useState<boolean>(false);
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmittingData(true);
        setError(undefined);
        const successHandler = (result: any) => {
            setInputFirstName('');
            setInputLastName('');
            setSubmittingData(false);
            setError(undefined);
            router.push('/customers/list/');
        }
        const errorHandler = (httpError: Error | AxiosError<any>) => {
            setSubmittingData(false);
            setError(httpError);
        }
        const data = {
            firstName: inputFirstName,
            lastName: inputLastName
        }
        createCustomer(data, successHandler, errorHandler);
    }

    return (
        <div>
            <Head>
                <title>New - Customers</title>
            </Head>
            <h3><Link href="/"><a data-testid="home-link">Home</a></Link></h3>
            <h3><Link href="/customers/list/"><a data-testid="list-customers-link">List - Customers</a></Link></h3>
            {
                submittingData
                    ? (
                        <div data-testid="submitting-content">Submitting...</div>
                    ) : (
                        error && (
                            <DisplayError error={error} />
                        )
                    )
            }
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
      <input data-testid="first-name" name="inputFirstName" type="text"
                        value={inputFirstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputFirstName(e.target.value)} />
                </label>
                <br />
                <label>
                    Last Name:
      <input data-testid="last-name" name="inputLastName" type="text"
                        value={inputLastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputLastName(e.target.value)} />
                </label>
                <br />
                <input className="btn btn-primary" data-testid="submit-button" type="submit" value="Submit" />
                <Link href="/customers/list/"><a className="btn btn-secondary" data-testid="cancel-button">Cancel</a></Link>
            </form>
        </div>
    );
}

export default NewCustomerPage;