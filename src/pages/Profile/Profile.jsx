import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Grid, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CreateProfileForm from '../../components/FormikContainer/CreateProfileForm/CreateProfileForm';

function Profile() {
    const [userInfo, setUserInfo] = useState();
    const [getProfile] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserInfo(JSON.parse(localStorage.getItem('user')));
        }
    }, []);
    return (
        <>
            {getProfile ? (
                <Grid
                    container
                    justifyContent='center'
                    alignItems='center'
                    style={{ height: '100vh' }}
                >
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3}
                            style={{ padding: '20px', textAlign: 'center' }}
                        >
                            <Avatar
                                alt='User Avatar'
                                src='/path/to/avatar.jpg'
                                sx={{
                                    width: 100,
                                    height: 100,
                                    margin: '0 auto',
                                }}
                            />
                            <Typography
                                variant='h5'
                                style={{
                                    margin: '10px 0',
                                }}
                            >
                                {userInfo?.username}
                            </Typography>
                            <Button variant='outlined' startIcon={<EditIcon />}>
                                Edit
                            </Button>
                            <Typography variant='subtitle1'>
                                Software Developer
                            </Typography>
                            <Typography
                                variant='body1'
                                style={{ margin: '20px 0' }}
                            >
                                Lorem ipsum dolor sit amet, adipiscingelit.
                                Nullam in commodo arcu.
                            </Typography>
                            <Typography variant='body2'>
                                Email: {userInfo?.email}
                            </Typography>
                            <Typography variant='body2'>
                                Location: New York, USA
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            ) : (
                <CreateProfileForm />
            )}
        </>
    );
}

export default Profile;
