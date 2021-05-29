export function createMockRouter() {
    return {
        pathname: '',
        basePath: '',
        query: {},
        push: jest.fn(),
        prefetch: jest.fn(() => Promise.resolve()),
    }
}