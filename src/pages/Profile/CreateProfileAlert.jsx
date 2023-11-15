import CreateIcon from '@mui/icons-material/Create';
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './CreateProfileAlert.css';
const CreateProfileAlert = () => {
    const [openModal, setOpenModal] = useState(true);
    const navigate = useNavigate();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 540,
        bgcolor: 'background.paper',
        border: '1px solid #3394d9',
        boxShadow: 24,
        p: 2,
        gap: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };
    return (
        <Modal open={openModal}>
            <Box sx={style}>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <img
                        alt='popup-img'
                        src='/Assets/profile-banner-img.png'
                        className='img'
                    />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Typography variant='h5'>Hey!</Typography>
                    <Typography
                        variant='h6'
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        Complete your profile to get the best out of CodeBooker.
                    </Typography>
                    <Button
                        variant='contained'
                        onClick={() => navigate('/profile')}
                        sx={{
                            marginTop: '2rem',
                            width: '100%',
                        }}
                    >
                        Create profile
                        <CreateIcon
                            sx={{
                                ml: '10px',
                            }}
                        />
                    </Button>
                </Box>
                <Box
                    onClick={() => setOpenModal(false)}
                    sx={{
                        position: 'absolute',
                        width: '30px',
                        height: '30px',
                        background: '#fff',
                        color: '#1976d2',
                        top: '-30px',
                        right: '-25px',
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '50%',
                        cursor: 'pointer',
                    }}
                >
                    X
                </Box>
            </Box>
        </Modal>
    );
};
export default CreateProfileAlert;
