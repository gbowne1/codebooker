import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login/Login';
import { MemoryRouter } from 'react-router';

describe('Login Test', () => {
    test('renders login form', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const usernameInput = screen.getByLabelText('Username or Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        // screen.debug()
    });
});
