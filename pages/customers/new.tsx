import React from 'react';
import Head from 'next/head'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { createCustomer } from '../../components/common/customer'
import { IHttpError } from '../../components/common/http_error'

interface IInputs {
    inputFirstName: string;
    inputLastName: string;
}

interface IState extends IInputs {
    error?: IHttpError;
    submittingData: boolean;
}

export class NewCustomerPage extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: undefined,
            inputFirstName: '',
            inputLastName: '',
            submittingData: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        } as Pick<IInputs, keyof IInputs>);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({
            submittingData: true,
            error: undefined
        })
        const successHandler = (result: any) => {
            this.setState({
                inputFirstName: '',
                inputLastName: '',
                submittingData: false,
                error: undefined
            });
            this.props.router.push('/customers/list/');
        }
        const errorHandler = (httpError: IHttpError) => {
            this.setState({
                submittingData: false,
                error: httpError
            });
        }
        const data = {
            firstName: this.state.inputFirstName,
            lastName: this.state.inputLastName
        }
        createCustomer(data, successHandler, errorHandler);
    }

    render() {
        return (
            <div>
                <Head>
                    <title>New - Customers</title>
                </Head>
                <h3><Link href="/"><a data-testid="home-link">Home</a></Link></h3>
                <h3><Link href="/customers/list/"><a data-testid="list-customers-link">List - Customers</a></Link></h3>
                {
                    this.state.submittingData
                        ? (
                            <div data-testid="submitting-content">Submitting...</div>
                        ) : (
                            this.state.error && (
                                <div data-testid="error-content">"An error has occurred: " + {JSON.stringify(this.state.error.response)}</div>
                            )
                        )
                }
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
          <input data-testid="first-name" name="inputFirstName" type="text"
                            value={this.state.inputFirstName}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Last Name:
          <input data-testid="last-name" name="inputLastName" type="text"
                            value={this.state.inputLastName}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input className="btn btn-primary" data-testid="submit-button" type="submit" value="Submit" />
                    <Link href="/customers/list/"><a className="btn btn-secondary" data-testid="cancel-button">Cancel</a></Link>
                </form>
            </div>
        );
    }
}

export default withRouter(NewCustomerPage)