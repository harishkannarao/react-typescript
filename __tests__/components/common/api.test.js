import { server } from '../../server';
import { rest } from 'msw';
import { executeGet, executePost, executeDelete } from "../../../components/common/api";

describe('Api reference test', () => {
    test('get data from api with common header', async () => {
        let receivedCustomHeader = null;
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                receivedCustomHeader = req.headers.get('X-Custom-Header');
                return res(
                    ctx.status(200),
                    ctx.json([]),
                )
            }),
        );

        let result = await executeGet(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers");
        expect(result.status).toBe(200);
        expect(receivedCustomHeader).toBe('foo-bar');
    });

    test('get data from api returns error', async () => {
        server.use(
            rest.get(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(500),
                )
            }),
        );

        try {
            await executeGet(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers");
            fail('should throw error');
        } catch (error) {
            expect(error.response.status).toBe(500);
        };
    });

    test('post data to api with common header', async () => {
        let receivedCustomHeader = null;
        server.use(
            rest.post(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                receivedCustomHeader = req.headers.get('X-Custom-Header');
                return res(
                    ctx.status(204)
                )
            }),
        );

        let result = await executePost(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers");
        expect(result.status).toBe(204);
        expect(receivedCustomHeader).toBe('foo-bar');
    });

    test('post data to api returns error', async () => {
        server.use(
            rest.post(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(500),
                )
            }),
        );

        try {
            await executePost(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers");
            fail('should throw error');
        } catch (error) {
            expect(error.response.status).toBe(500);
        };
    });

    test('delete data in api with common header', async () => {
        let receivedCustomHeader = null;
        server.use(
            rest.delete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                receivedCustomHeader = req.headers.get('X-Custom-Header');
                return res(
                    ctx.status(204)
                )
            }),
        );

        let result = await executeDelete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers");
        expect(result.status).toBe(204);
        expect(receivedCustomHeader).toBe('foo-bar');
    });

    test('delete data in api returns error', async () => {
        server.use(
            rest.delete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers", (req, res, ctx) => {
                return res(
                    ctx.status(500),
                )
            }),
        );

        try {
            await executeDelete(process.env.NEXT_PUBLIC_CUSTOMER_API_BASE_URL + "/customers");
            fail('should throw error');
        } catch (error) {
            expect(error.response.status).toBe(500);
        };
    });
});