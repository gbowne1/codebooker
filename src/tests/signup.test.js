import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/Register/Register';

describe('Register Component', () => {
    it('should render the registration form', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        const usernameInput = screen.getByRole('textbox', {
            name: /username/i,
        });
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByTestId('Password');
        const confirmPasswordInput = screen.getByTestId('Confirm Password');
        const agreeCheckbox = screen.getByRole('checkbox', {
            name: /i agree to the terms and conditions/i,
        });
        const policy = screen.getByRole('link', { name: /privacy policy/i });
        const signUpButton = screen.getByRole('button', { name: /sign up/i });
        const signin = screen.getByRole('link', {
            name: /already have an account\? sign in/i,
        });

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(agreeCheckbox).toBeInTheDocument();
        expect(policy).toBeInTheDocument();
        expect(signUpButton).toBeInTheDocument();
        expect(signin).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
        const usernameInput = screen.getByRole('textbox', {
            name: /username/i,
        });
        const emailInput = screen.getByRole('textbox', { name: /email/i });
        const passwordInput = screen.getByTestId('Password');
        const confirmPasswordInput = screen.getByTestId('Confirm Password');
        const agreeCheckbox = screen.getByRole('checkbox', {
            name: /i agree to the terms and conditions/i,
        });
        const signUpButton = screen.getByRole('button', { name: /sign up/i });

        fireEvent.change(usernameInput, { target: { value: 'test' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, {
            target: { value: '123456' },
        });
        fireEvent.change(confirmPasswordInput, {
            target: { value: '123456' },
        });
        fireEvent.click(agreeCheckbox);

        fireEvent.click(signUpButton);
        const user = {
            _id: '64c891e5ecd534e790f4f518',
            username: 'test',
            email: 'test@gmail.com',
            password:
                '$2a$12$DboEjKLb6kVTbO92x6vgiOeOKoO2eGUZ1qgzIs8wQ9kXTppKb/7qu',
            created_on: '2023-08-01T05:02:29.461Z',
            __v: 0,
        };
        // Verify that the correct data is stored in localStorage
        await waitFor(() =>
            expect(localStorage.getItem('token')).toEqual(
                JSON.stringify('mockToken')
            )
        );
        expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
    });

    it('renders PrivacyPolicy page on clicking Privacy Policy link', () => {
        // Render the Register component within a MemoryRouter
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Find the "Privacy Policy" link and click it
        const privacyPolicyLink = screen.getByRole('link', {
            name: /privacy policy/i,
        });
        fireEvent.click(privacyPolicyLink);

        expect(privacyPolicyLink).toHaveAttribute('target', '_blank');
        expect(privacyPolicyLink).toHaveAttribute('href', '/privacy-policy');
    });
});
