import Link from 'next/link'
import { Router, NextRouter } from 'next/router'

export type CustomerModel = {
    id: string;
    firstName: string;
    lastName: string;
}

type CustomerProps = {
    value: CustomerModel;
    handleDeleteCustomer: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export function Customer(props: CustomerProps) {
    return (
        <tr>
            <td><input data-testid={`delete-button-${props.value.id}`} type="button" data-id={props.value.id} onClick={props.handleDeleteCustomer} value="Delete" /></td>
            <td data-testid="id">{props.value.id}</td>
            <td data-testid="firstName">{props.value.firstName}</td>
            <td data-testid="lastName">{props.value.lastName}</td>
        </tr>
    )
}

type CustomerListProps = {
    isProcessing: boolean;
    router: Router | NextRouter;
    data: CustomerModel[];
    handleDeleteCustomer: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export function CustomerList(props: CustomerListProps) {
    return (
        props.isProcessing
            ? (
                <div data-testid="processing-content">Processing...</div>
            ) : (
                <div data-testid="success-content">
                    <span id="customer-table-top"></span>
                    <Link href={{
                        pathname: props.router.pathname,
                        query: props.router.query,
                        hash: 'customer-table-bottom',
                    }}><a className="btn btn-primary" data-testid='go-to-bottom-link'>Go to Bottom</a></Link>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data.map((item) =>
                                    <Customer handleDeleteCustomer={props.handleDeleteCustomer} key={item.id} value={item} />
                                )
                            }
                        </tbody>
                    </table>
                    <span id="customer-table-bottom"></span>
                    <Link href={{
                        pathname: props.router.pathname,
                        query: props.router.query,
                        hash: 'customer-table-top',
                    }}><a className="btn btn-primary" data-testid='go-to-top-link'>Go to Top</a></Link>
                </div>
            )
    )
}