import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HelpIcon from '@mui/icons-material/Help';
import MessageIcon from '@mui/icons-material/Message';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { CaptureFeedback } from '../CaptureFeedback/CaptureFeedback'; //

export default function Dropdown() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); // Change the state name to 'loggedIn'
    const [feedbackVisible, setFeedbackVisible] = useState(false); // Toggle visibility of feedback panel
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (
            localStorage.getItem('user') != null &&
            localStorage.getItem('token') != null
        ) {
            setLoggedIn(true);
        }
    }, []);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    function handleLogOut() {
        toast.success('Logged out!!');
        setTimeout(() => {
            setLoggedIn(false); // Toggle the loggedIn state
            localStorage.setItem('user', null);
            localStorage.setItem('token', null);
            navigate('/login');
        }, 1500);
    }

    function navigateToProfile() {
        navigate('/profile');
    }

    function toggleFeedback() {
        setFeedbackVisible((prevFeedbackVisible) => !prevFeedbackVisible);
        handleClose();
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Tooltip title='Account settings'>
                    <IconButton
                        onClick={handleClick}
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>R</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <HelpIcon fontSize='large' />
                    &nbsp; Help
                </MenuItem>
                <MenuItem onClick={toggleFeedback}>
                    <MessageIcon fontSize='large' />
                    &nbsp; Feedback
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize='small' />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                {loggedIn ? ( // Use the 'loggedIn' state to conditionally render the Logout/Login menu item
                    <>
                        <MenuItem onClick={navigateToProfile}>
                            <ListItemIcon>
                                <ManageAccountsIcon fontSize='small' />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon>
                                <LogoutIcon fontSize='small' />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={handleLogin}>
                        <ListItemIcon>
                            <LoginIcon fontSize='small' />
                        </ListItemIcon>
                        Login
                    </MenuItem>
                )}
            </Menu>
            <Toaster />
            {feedbackVisible && (
                <CaptureFeedback
                    isActive={feedbackVisible}
                    onClose={toggleFeedback}
                />
            )}
        </React.Fragment>
    );
}
