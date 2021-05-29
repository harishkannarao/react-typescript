import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { server } from '../../server'
import { createMockRouter } from "../../mock_router";
import { rest } from 'msw'
import * as queryParamModule from "../../../components/common/query_param"
import * as nextRouterModule from "next/router"

import { CustomersListPage } from "../../../pages/customers/list";

describe('CustomersListPage Component test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        queryParamModule.getParameterByName = jest.fn();
        nextRouterModule.useRouter = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('prefilling firstName search from query param', async () => {
        queryParamModule.getParameterByName.mockImplementation((param) => {
            if (param == 'firstName') {
                return 'test-first-name';
            } else {
                throw new Error("Unexpected param: " + param);
            }
        });

        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );
        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />);
        await screen.findByTestId('success-content');
        expect(screen.getByTestId('input-first-name').getAttribute('value')).toBe('test-first-name');
    });

    test('display customers filtered by first name from query', async () => {
        queryParamModule.getParameterByName.mockImplementation((param) => {
            if (param == 'firstName') {
                return 'test-first-name';
            } else {
                throw new Error("Unexpected param: " + param);
            }
        });

        let receivedFirstName = null;
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                receivedFirstName = req.url.searchParams.get('firstName');
                return res(
                    ctx.status(200),
                    ctx.json(
                        [
                            {
                                id: 1,
                                firstName: 'test-first-name',
                                lastName: 'test-last-name'
                            }
                        ]
                    ),
                )
            }),
        );

        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />);

        await screen.findByTestId('success-content');
        expect(screen.getAllByTestId('id')[0].textContent).toBe('1');
        expect(receivedFirstName).toBe('test-first-name');
    })

    test('displays multiple customers from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        const apiResponse = [
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
        let receivedRequest = null;
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                receivedRequest = req;
                return res(
                    ctx.status(200),
                    ctx.json(apiResponse),
                )
            }),
        );

        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />)
        await screen.findByTestId('success-content');

        expect(screen.getAllByTestId('id')[0].textContent).toBe('1');
        expect(screen.getAllByTestId('firstName')[0].textContent).toBe('test-first-name-1');
        expect(screen.getAllByTestId('lastName')[0].textContent).toBe('test-last-name-1');

        expect(screen.getAllByTestId('id')[1].textContent).toBe('2');
        expect(screen.getAllByTestId('firstName')[1].textContent).toBe('test-first-name-2');
        expect(screen.getAllByTestId('lastName')[1].textContent).toBe('test-last-name-2');

        expect(Array.from(receivedRequest.url.searchParams.entries())).toHaveLength(0);
    });

    test('filters customers and update query on change of first name search', async () => {
        let callCount = 0;
        let receivedFirstName = null;
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                callCount += 1;
                receivedFirstName = req.url.searchParams.get('firstName');
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );

        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);
        mockRouter.push = jest.fn()
        mockRouter.pathname = 'test-path-name';
        mockRouter.query = {
            firstName: 'test-old-first-name',
            someOtherQuery: 'test-query'
        };

        render(<CustomersListPage />);

        await screen.findByTestId('success-content');

        await waitFor(() => expect(callCount).toBe(1));
        await waitFor(() => expect(receivedFirstName).toBeNull());

        fireEvent.change(screen.getByTestId("input-first-name"), { target: { value: 'test-first-name' } });

        await screen.findByTestId('processing-content');

        await screen.findByTestId('success-content');

        await waitFor(() => expect(callCount).toBe(2));
        await waitFor(() => expect(receivedFirstName).toBe('test-first-name'));

        expect(mockRouter.push.mock.calls.length).toBe(1);
        expect(mockRouter.push.mock.calls[0][0].pathname).toBe("test-path-name");
        expect(mockRouter.push.mock.calls[0][0].query.firstName).toBe("test-first-name");
        expect(mockRouter.push.mock.calls[0][0].query.someOtherQuery).toBe("test-query");
        expect(mockRouter.push.mock.calls[0][1]).toBeUndefined();
        expect(mockRouter.push.mock.calls[0][2].shallow).toBe(true);
    })

    test('does not filter customers by first name given empty input and removes first name from query', async () => {
        let callCount = 0;
        let receivedFirstName = null;
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                callCount += 1;
                if (req.url.searchParams.has('firstName')) {
                    receivedFirstName = req.url.searchParams.get('firstName');
                }
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );

        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);
        mockRouter.push = jest.fn()
        mockRouter.pathname = 'test-path-name';
        mockRouter.query = {
            firstName: 'test-old-first-name',
            someOtherQuery: 'test-query'
        };

        render(<CustomersListPage />);

        await screen.findByTestId('success-content');

        await waitFor(() => expect(callCount).toBe(1));
        await waitFor(() => expect(receivedFirstName).toBeNull());

        fireEvent.change(screen.getByTestId("input-first-name"), { target: { value: '   ' } });

        await screen.findByTestId('processing-content');

        await screen.findByTestId('success-content');

        await waitFor(() => expect(callCount).toBe(2));
        await waitFor(() => expect(receivedFirstName).toBeNull());

        expect(mockRouter.push.mock.calls.length).toBe(1);
        expect(mockRouter.push.mock.calls[0][0].pathname).toBe("test-path-name");
        expect(mockRouter.push.mock.calls[0][0].query.firstName).toBeUndefined();
        expect(mockRouter.push.mock.calls[0][0].query.someOtherQuery).toBe("test-query");
        expect(mockRouter.push.mock.calls[0][1]).toBeUndefined();
        expect(mockRouter.push.mock.calls[0][2].shallow).toBe(true);
    })

    test('displays empty customers', async () => {
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );
        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />)
        await screen.findByTestId('success-content');
        expect(screen.queryByTestId('id')).toBeNull();
    });

    test('displays error from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        const apiResponse = {
            'message': 'unit-test-error'
        }
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json(apiResponse),
                )
            }),
        );
        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />)
        await screen.findByTestId('error-content');
        expect(screen.queryByTestId('error-content').textContent).toContain('unit-test-error');
        expect(screen.queryByTestId('error-content').textContent).toContain('Internal Server Error');
    });

    test('displays initial content when waiting for response from api', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        const apiResponse = {
            'message': 'unit-test-error'
        }
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.delay(1000),
                    ctx.status(500),
                    ctx.json(apiResponse),
                )
            }),
        );
        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />)
        expect(screen.queryByTestId('processing-content').textContent).toContain('Processing...');
        await screen.findByTestId('error-content', {}, { 'timeout': 2000 });
    });

    test('displays navigation links correctly', async () => {
        const apiUrl = process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers"
        server.use(
            rest.get(apiUrl, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );
        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />)
        await screen.findByTestId('success-content');

        expect(screen.queryByTestId('home-link').getAttribute("href")).toBe('/');
        expect(screen.queryByTestId('new-customer-link').getAttribute("href")).toBe('/customers/new');
    });

    test('customer deletion', async () => {
        let listCustomersCount = 0;
        let deleteRequestJson = null;
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                listCustomersCount = listCustomersCount + 1;
                return res(
                    ctx.status(200),
                    ctx.json(
                        [
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
                    ),
                )
            }),
            rest.delete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                deleteRequestJson = req.body
                return res(
                    ctx.delay(500),
                    ctx.status(200),
                )
            }),
        );

        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />)
        await screen.findByTestId('success-content');
        expect(listCustomersCount).toBe(1);

        fireEvent.click(screen.getAllByTestId("delete-button")[1]);
        await screen.findByTestId('processing-content');
        await waitFor(() => expect(screen.queryByTestId('processing-content')).toBeNull());

        await waitFor(() => expect(deleteRequestJson).not.toBeNull());
        expect(deleteRequestJson.id).toBe(2);

        expect(listCustomersCount).toBe(2);
    });

    test('display error during customer deletion', async () => {
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json(
                        [
                            {
                                id: 1,
                                firstName: 'test-first-name-1',
                                lastName: 'test-last-name-1'
                            }
                        ]
                    ),
                )
            }),
            rest.delete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ 'message': 'unit-test-error' }),
                )
            }),
        );
        let mockRouter = createMockRouter();
        nextRouterModule.useRouter.mockImplementation(() => mockRouter);

        render(<CustomersListPage />)
        await screen.findByTestId('success-content');

        fireEvent.click(screen.getAllByTestId("delete-button")[0]);

        await screen.findByTestId('error-content');
        expect(screen.queryByTestId('error-content').textContent).toContain('unit-test-error');

        server.use(
            rest.delete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(200),
                )
            }),
        );

        fireEvent.click(screen.getAllByTestId("delete-button")[0]);

        await screen.findByTestId('success-content');
        await waitFor(() => expect(screen.queryByTestId('error-content')).toBeNull());
        expect(screen.queryByTestId('id')).not.toBeNull();
    });
});