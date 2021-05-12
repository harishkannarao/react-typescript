export function createMockRouter() {
    return {
        pathname: '',
        basePath: '',
        query: {},
        push: function(url, as, options) {
            return;
        }
    }
}