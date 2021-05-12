import Link from 'next/link'

export function Customer(props) {
    return (
        <tr>
            <td><input data-testid="delete-button" type="button" data-id={props.value.id} onClick={props.handleDeleteCustomer} value="Delete" /></td>
            <td data-testid="id">{props.value.id}</td>
            <td data-testid="firstName">{props.value.firstName}</td>
            <td data-testid="lastName">{props.value.lastName}</td>
        </tr>
    )
}

export function CustomerList(props) {
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