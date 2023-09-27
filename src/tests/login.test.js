import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';

describe('Login Component', () => {
    it('should render the login form', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText('Username or Email');
        const passwordInput = screen.getByLabelText('Password');
        const rememberMeCheckbox = screen.getByRole('checkbox', {
            name: 'Remember Me',
        });
        const signInButton = screen.getByRole('button', { name: 'Sign In' });
        const forgotPasswordLink = screen.getByText('Forgot Password');
        const registerLink = screen.getByText('register here');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(rememberMeCheckbox).toBeInTheDocument();
        expect(signInButton).toBeInTheDocument();
        expect(forgotPasswordLink).toBeInTheDocument();
        expect(registerLink).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const usernameInput = screen.getByLabelText('Username or Email');
        const passwordInput = screen.getByLabelText('Password');
        const rememberMeCheckbox = screen.getByRole('checkbox', {
            name: 'Remember Me',
        });
        const signInButton = screen.getByRole('button', { name: 'Sign In' });

        fireEvent.change(usernameInput, {
            target: { value: 'test@gmail.com' },
        });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.click(rememberMeCheckbox);

        const user = {
            _id: '64c891e5ecd534e790f4f518',
            username: 'test',
            email: 'test@gmail.com',
            password:
                '$2a$12$DboEjKLb6kVTbO92x6vgiOeOKoO2eGUZ1qgzIs8wQ9kXTppKb/7qu',
            created_on: '2023-08-01T05:02:29.461Z',
            __v: 0,
        };

        fireEvent.click(signInButton);

        await waitFor(() =>
            expect(localStorage.getItem('token')).toEqual(
                JSON.stringify('mockToken')
            )
        );
        expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
    });
});
