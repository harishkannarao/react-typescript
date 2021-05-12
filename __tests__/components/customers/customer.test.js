import React from 'react'
import { render, screen } from '@testing-library/react'
import { createMockRouter } from "../../mock_router";

import { Customer, CustomerList } from "../../../components/customer/customer";

describe('Customer Component test', () => {
    test('displays customer data', async () => {
        const customerData = {
            id: 1,
            firstName: 'test-first-name',
            lastName: 'test-last-name'
        }
        render(
            <table>
                <tbody>
                    <Customer
                        value={customerData}
                    />
                </tbody>
            </table>

        )
        expect(screen.queryByTestId('id').textContent).toBe('1');
        expect(screen.queryByTestId('firstName').textContent).toBe('test-first-name');
        expect(screen.queryByTestId('lastName').textContent).toBe('test-last-name');
    });
});

describe('CustomerList Component test', () => {
    test('displays list of customer data', async () => {
        const customersData = [
            {
                id: 1,
                firstName: 'test-first-name-1',
                lastName: 'test-last-name-1'
            },
            {
                id: 2,
                firstName: 'test-first-name-2',
                lastName: 'test-last-name-2'
            }
        ]
        render(
            <CustomerList
                data={customersData}
                router={createMockRouter()}
            />
        )
        expect(screen.getAllByTestId('id')[0].textContent).toBe('1');
        expect(screen.getAllByTestId('firstName')[0].textContent).toBe('test-first-name-1');
        expect(screen.getAllByTestId('lastName')[0].textContent).toBe('test-last-name-1');

        expect(screen.getAllByTestId('id')[1].textContent).toBe('2');
        expect(screen.getAllByTestId('firstName')[1].textContent).toBe('test-first-name-2');
        expect(screen.getAllByTestId('lastName')[1].textContent).toBe('test-last-name-2');
    });

    test('displays go to top and bottom links', async () => {
        const customersData = []
        const mockRouter = createMockRouter()
        mockRouter.pathname = 'test-pathname';
        mockRouter.query = { test: 'value' };

        const result = render(
            <CustomerList
                data={customersData}
                router={mockRouter}
            />
        )
        expect(result.container.querySelector('#customer-table-top')).not.toBeNull()
        expect(result.container.querySelector('#customer-table-bottom')).not.toBeNull()
        expect(screen.getByTestId('go-to-bottom-link').getAttribute('href')).toBe('/test-pathname?test=value#customer-table-bottom')
        expect(screen.getByTestId('go-to-top-link').getAttribute('href')).toBe('/test-pathname?test=value#customer-table-top')
    })
});