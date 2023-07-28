import React, { useState } from 'react';
import axios from 'axios';
import {
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Login.css';

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
                window.location.href = 'http://localhost:3000/home'; // Redirect to the desired page
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='login-wrapper'>
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
            <div className='checkbox-wrapper'>
                <input
                    type='checkbox'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label>Remember Me</label>
            </div>
            <a href='/forgot-password' className='forgot-password'>
                Forgot Password
            </a>
            <button onClick={handleLogin} className='login-button'>
                Log In
            </button>
            <Typography variant='body2'>
                Don&apos;t have an account? Please{' '}
                <Link to='/register'>register here</Link>
            </Typography>
        </div>
    );
}

export default Login;
