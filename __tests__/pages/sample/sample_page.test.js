import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import { SamplePage } from '../../../pages/sample/sample_page.js'

describe('Sample Page test', () => {
    test('displays message', async () => {

        render(<SamplePage />)
        const message = screen.queryByTestId('message')
        expect(message.textContent).toBe('This is a sample page')
    });
});