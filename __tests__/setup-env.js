import {server} from './server.js'

beforeAll(() => server.listen())
beforeEach(() => {
    server.resetHandlers();
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => null);
})
afterEach(() => {
    server.resetHandlers();
    console.error.mockRestore();
})
afterAll(() => server.close())