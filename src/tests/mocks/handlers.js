// src/mocks/handlers.js
import { rest } from 'msw';
const user = {
    _id: '64c891e5ecd534e790f4f518',
    username: 'test',
    email: 'test@gmail.com',
    password: '$2a$12$DboEjKLb6kVTbO92x6vgiOeOKoO2eGUZ1qgzIs8wQ9kXTppKb/7qu',
    created_on: '2023-08-01T05:02:29.461Z',
    __v: 0,
};

export const handlers = [
    // Handles a POST /login request
    // Mock the login API endpoint
    rest.post('http://localhost:3001/api/user/login', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                token: 'mockToken',
                user: user,
            })
        );
    }),

    // Mock the signup API endpoint
    rest.post('http://localhost:3001/api/user/register', (req, res, ctx) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res(
                ctx.status(400),
                ctx.json({ message: 'Invalid input data' })
            );
        }

        // Simulate a successful registration
        return res(
            ctx.status(200),
            ctx.json({
                token: 'mockToken',
                user: user,
            })
        );
    }),
];
