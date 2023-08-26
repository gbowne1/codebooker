import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
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

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (password !== confirmPassword) {
                console.log('Incorrect password');
                setLoading(false);
                return;
            }

            const response = await axios.put(
                `http://localhost:3001/api/user/reset-password/${token}`,
                {
                    password,
                }
            );

            if (response.status === 200) {
                // Password reset successful, redirect to login page or desired location
                navigate('/login');
                console.log(response);
            }
        } catch (error) {
            // Handle rest password error, display error message to the user
            console.error(error);
        }

        setLoading(false);
    };

    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Reset password
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleResetPassword}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={
                                                    handleTogglePasswordVisibility
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Confirm Password'
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={
                                                    handleToggleConfirmPasswordVisibility
                                                }
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
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading && (
                                <CircularProgress
                                    size={15}
                                    sx={{ mr: '10px' }}
                                    color='inherit'
                                />
                            )}
                            Reset password
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ResetPassword;
