import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { listCustomers, deleteCustomer } from "../../components/common/customer";
import * as queryParamModule from "../../components/common/query_param"
import { CustomerModel, CustomerList } from "../../components/customer/customer";
import { DisplayError } from "../../components/error/error";
import { AxiosError } from 'axios';

interface Inputs {
    inputFirstName: string;
}

interface State extends Inputs {
    firstNameTypingTimeout?: any,
    error?: Error | AxiosError<any>,
    isProcessing: boolean,
    data: CustomerModel[]
}

export class CustomersListPage extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputFirstName: '',
            firstNameTypingTimeout: undefined,
            error: undefined,
            isProcessing: false,
            data: []
        };
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (this.state.firstNameTypingTimeout) {
            clearTimeout(this.state.firstNameTypingTimeout);
        }
        this.setState({
            'inputFirstName': event.target.value,
            firstNameTypingTimeout: setTimeout(() => {
                this.fetchData();
            }, 500)
        });
        let query = this.props.router.query;
        if (event.target.value.trim() == '') {
            delete query['firstName'];
        } else {
            query['firstName'] = event.target.value;
        }
        const url = {
            'pathname': this.props.router.pathname,
            'query': query
        }
        this.props.router.push(url, undefined, { shallow: true });
    }

    errorHandler(httpError: Error | AxiosError<any>) {
        this.setState({
            isProcessing: false,
            error: httpError
        });
    }

    handleDeleteCustomer(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({
            isProcessing: true
        });
        const successHandler = (result: any) => {
            this.fetchData();
        }
        const data = { 'id': Number(event.currentTarget.getAttribute('data-id')) }
        deleteCustomer(data, successHandler, this.errorHandler)
    }

    fetchData(firstName?: any) {
        this.setState({
            isProcessing: true
        });
        const successHandler = (result: any) => {
            this.setState({
                isProcessing: false,
                data: result.data,
                error: undefined,
            });
        }
        var resolvedFirstName = firstName;
        if (resolvedFirstName == null) {
            resolvedFirstName = this.state.inputFirstName.trim();
        }
        listCustomers(resolvedFirstName, successHandler, this.errorHandler);
    }

    componentDidMount() {
        var firstName: string | null = queryParamModule.getParameterByName("firstName");
        if (firstName != null) {
            this.setState({
                'inputFirstName': firstName
            })
        }
        this.fetchData(firstName);
    }

    componentWillUnmount() {
        if (this.state.firstNameTypingTimeout) {
            clearTimeout(this.state.firstNameTypingTimeout);
        }
    }

    render() {
        var title = 'List - Customers';
        if (this.state.inputFirstName.trim() != '') {
            title = this.state.inputFirstName + " :: " + title;
        }
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
                    !this.state.isProcessing && this.state.error &&
                    <DisplayError error={this.state.error} />
                }
                <label>
                    First Name:
                        <input data-testid="input-first-name" name="inputFirstName" type="text"
                        value={this.state.inputFirstName}
                        onChange={this.handleFirstNameChange} />
                </label>
                <CustomerList router={this.props.router} isProcessing={this.state.isProcessing} handleDeleteCustomer={this.handleDeleteCustomer} data={this.state.data} />
            </div>
        );
    }
}

export default withRouter(CustomersListPage)