import React from 'react'
import { render, fireEvent, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react'
import { server } from '../../server'
import { rest } from 'msw'
import { createMockRouter } from "../../mock_router";

import { NewCustomerPage } from "../../../pages/customers/new";

describe('NewCustomerPage Component test', () => {
    beforeEach(() => {
        server.use(
            rest.post(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                )
            }),
        );
    });

    test('navigation links', async () => {
        var redirectUrl = null;
        const mockRouter = createMockRouter()
        mockRouter.push = function(url, as, options) {
            redirectUrl = url;
            return;
        }
        render(<NewCustomerPage router={mockRouter} />);
        expect(screen.queryByTestId('home-link').getAttribute("href")).toBe('/');
        expect(screen.queryByTestId('list-customers-link').getAttribute("href")).toBe('/customers/list');
        expect(screen.queryByTestId('cancel-button').getAttribute("href")).toBe('/customers/list');
    });

    test('new customer creation', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        var requestJson = null;
        server.use(
            rest.post(apiUrl, (req, res, ctx) => {
                requestJson = req.body
                return res(
                    ctx.delay(500),
                    ctx.status(200),
                )
            }),
        );

        var redirectUrl = null;
        const mockRouter = createMockRouter()
        mockRouter.push = function(url, as, options) {
            redirectUrl = url;
            return;
        }
        render(<NewCustomerPage router={mockRouter} />);
        expect(screen.queryByTestId('first-name').getAttribute("value")).toBe('');
        expect(screen.queryByTestId('last-name').getAttribute("value")).toBe('');

        fireEvent.change(screen.getByTestId("first-name"), { target: { value: 'test-first-name' } });
        fireEvent.change(screen.getByTestId("last-name"), { target: { value: 'test-last-name' } });
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.queryByTestId('submitting-content')).not.toBeNull();
        await waitFor(() => expect(screen.queryByTestId('submitting-content')).toBeNull());

        await waitFor(() => expect(redirectUrl).toBe('/customers/list/'));

        await waitFor(() => expect(requestJson).not.toBeNull());
        expect(requestJson.firstName).toBe('test-first-name');
        expect(requestJson.lastName).toBe('test-last-name');
    });

    test('displays error from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        server.use(
            rest.post(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.delay(500),
                    ctx.status(500),
                    ctx.json({'message': 'unit-test-error'}),
                )
            }),
        );

        render(<NewCustomerPage router={createMockRouter()} />);

        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.queryByTestId('submitting-content')).not.toBeNull();
        await waitFor(() => expect(screen.queryByTestId('submitting-content')).toBeNull());

        await screen.findByTestId('error-content');
        expect(screen.queryByTestId('error-content').textContent).toContain('unit-test-error');
        expect(screen.queryByTestId('error-content').textContent).toContain('Internal Server Error');
    });
});