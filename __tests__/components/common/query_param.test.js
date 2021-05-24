import * as queryParamModule from "../../../components/common/query_param";

describe('query param function test', () => {
    test('returns query param from the url', async () => {
        let result = queryParamModule.getParameterByName('testQuery', 'http://www.example.com/some_page?testQuery=testValue')
        expect(result).toBe('testValue');
    })

    test('returns empty string from the url when query param is present', async () => {
        let result = queryParamModule.getParameterByName('testQuery', 'http://www.example.com/some_page?testQuery')
        expect(result).toBe('');
    })

    test('returns null when url does not contain the query param', async () => {
        let result = queryParamModule.getParameterByName('testQuery', 'http://www.example.com/some_page')
        expect(result).toBeNull();
    })
})