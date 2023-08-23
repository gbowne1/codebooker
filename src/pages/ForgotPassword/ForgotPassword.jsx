import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:3001/api/user/forgot-password',
                { email: userEmail }
            );
            setUserEmail('');
            console.log(response);
        } catch (error) {
            console.error(error);
        }

       
        setLoading(false);
    }




    return (
        <div className='forgotpassword-wrapper'>
            <div className='forgotpassword-wrapper-icon'>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <EmailIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Update your password
                </Typography>
                <div>
                <Typography component='p' variant='p' mt={2}>
                Enter your email address and click SEND EMAIL.
                </Typography>
                </div>
            </div>
            <div className='forgotpassword-wrapper-input'>
                <TextField
                    label='Email'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
            </div>

            <button  onClick={handleForgotPassword} className='forgotpassword-button'>
            {loading && <CircularProgress size={15} sx={{mr:'10px'}} color="inherit" />}
            SEND EMAIL
            </button>
            <div className='forgotpassword-wrapper-cancel'>
                <Typography variant='body2'>
                    <Link to='/login'>Cancel</Link> 
                </Typography>
            </div>
        </div>
    );
};

export default ForgotPassword;
