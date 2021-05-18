import React from 'react'
import { render, screen } from '@testing-library/react'
import { DisplayError } from "../../../components/error/error"

describe('Error Component test', () => {
    test('displays general error message', async () => {
        const error = new Error("unit-test-error")
        render(
            <DisplayError error={error} />
        )
        expect(screen.queryByTestId('error-content').textContent).toContain('unit-test-error');
    });

    test('displays axios error message', async () => {
        const error = {
            isAxiosError: true,
            response: {
                status: 'unit-test-axios-error'
            }
        }
        render(
            <DisplayError error={error} />
        )
        expect(screen.queryByTestId('error-content').textContent).toContain('unit-test-axios-error');
    });
})