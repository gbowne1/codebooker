import React, { useState } from 'react';
import {
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Button,
    Typography,
    Container,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(
            (prevShowConfirmPassword) => !prevShowConfirmPassword
        );
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('/api/register', {
                username,
                email,
                password,
            });
            if (response.status === 200) {
                // Registration successful, redirect to login page or desired location
                window.location.href = '/login';
            }
        } catch (error) {
            console.error(error);
            // Handle registration error, display error message to the user
        }
    };

    return (
        <Container maxWidth='xs' className='register-container'>
            <TextField label='Username' />
            <TextField label='Email' type='email' />
            <TextField
                label='Password'
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    ),
                }}
            />
            <TextField
                label='Confirm Password'
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={handleToggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? (
                                <VisibilityOff />
                            ) : (
                                <Visibility />
                            )}
                        </IconButton>
                    ),
                }}
            />
            {/* Add optional fields here */}
            <FormControlLabel
                control={<Checkbox />}
                label='I agree to the Terms and Conditions'
            />
            <Typography variant='body2'>
                Read our{' '}
                <Link href='/privacy-policy' target='_blank'>
                    Privacy Policy
                </Link>
                .
            </Typography>
            <Button variant='contained' onClick={handleRegister}>
                Sign Up
            </Button>
        </Container>
    );
};

export default Register;
