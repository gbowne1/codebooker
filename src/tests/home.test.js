import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home/Home';
import { MemoryRouter } from 'react-router';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};

    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

const user = {
    _id: '64c891e5ecd534e790f4f518',
    username: 'test',
    email: 'test@gmail.com',
    password: '$2a$12$DboEjKLb6kVTbO92x6vgiOeOKoO2eGUZ1qgzIs8wQ9kXTppKb/7qu',
    created_on: '2023-08-01T05:02:29.461Z',
    __v: 0,
};
beforeEach(() => {
    // Set up a mock localStorage before each test
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem(
        'token',
        JSON.stringify(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiI2NGM4OTFlNWVjZDUzNGU3OTBmNGY1MTgiLCJpYXQiOjE2OTQ5NTQ1NTgsImV4cCI6MTY5NTEyNzM1OH0.w6APSk-KNPXdZB7K9PnLdcUEv6nbZ3ER4AcWkvMltTM'
        )
    );
});

afterEach(() => {
    // Clean up the mock localStorage after each test
    window.localStorage.clear();
});

describe('Home Test', () => {
    test('In presence of localStorage', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const nav = screen.getByText(/codebooker/i);
        expect(nav).toBeInTheDocument();
    });
});
