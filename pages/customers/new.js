import React from 'react';
import Head from 'next/head'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { createCustomer } from '../../components/common/customer'

export class NewCustomerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            inputFirstName: '',
            inputLastName: '',
            submittingData: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            submittingData: true,
            error: null
        })
        const successHandler = (result) => {
            this.setState({
                inputFirstName: '',
                inputLastName: '',
                submittingData: false,
                error: null
            });
            this.props.router.push('/customers/list/');
        }
        const errorHandler = (httpError) => {
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