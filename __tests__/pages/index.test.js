import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import { HomePage } from '../../pages/index.js'

describe('Index Page test', () => {
    test('displays message', async () => {

        render(<HomePage />)
    
        const message = screen.queryByTestId('message')
        expect(message.textContent).toBe('Welcome to Next.js!!!')
    });
});