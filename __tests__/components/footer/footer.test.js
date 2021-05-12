import { Footer } from "../../../components/footer/common-footer";
import { createMockRouter } from "../../mock_router";
import { render, screen } from '@testing-library/react'

describe('Footer Component test', () => {
    test('displays footer details', async () => {
        const mockRouter = createMockRouter();
        mockRouter.pathname = 'test-path-name';
        mockRouter.basePath = 'test-base-path';
        mockRouter.query = {'testQuery':'test-value'};
        render(
            <Footer router={mockRouter} />
        )
        expect(screen.queryByTestId('common-footer').textContent).toBe('Common Footer');
        expect(screen.queryByTestId('footer-pathname').textContent).toBe('test-path-name');
        expect(screen.queryByTestId('footer-base-path').textContent).toBe('test-base-path');
        expect(screen.queryByTestId('footer-base-path').textContent).toBe('test-base-path');
        expect(screen.queryByTestId('footer-query').textContent).toBe('{"testQuery":"test-value"}');
    });
});