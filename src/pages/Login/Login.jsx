import React, { useState } from 'react';
import axios from 'axios';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', {
                usernameOrEmail,
                password,
                rememberMe,
            });
            if (response.status === 200) {
                window.location.href = '/'; // Redirect to the desired page
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <TextField
                label='Username or Email'
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <TextField
                label='Password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <label>
                <input
                    type='checkbox'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
            </label>
            <a href='/forgot-password'>Forgot Password</a>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
}

export default Login;
