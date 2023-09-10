import React from 'react';
import './Support.css';
import HouseIcon from '@mui/icons-material/House';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import SupportForm from '../../components/FormikContainer/SupportForm/SupportForm';

const Support = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [closeNotice, setCloseNotce] = useState(true);
    const userName = JSON.parse(localStorage.getItem('user')).username;
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleLogOut = () => {
        localStorage.setItem('user', null);
        localStorage.setItem('token', null);
        navigate('/login');
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const matches = useMediaQuery('(max-width:700px)');
    const mobileDisplay = useMediaQuery('(max-width:991px)');
    return (
        <div className='support-wrapper'>
            <header className='global-header'>
                <Box
                    sx={{
                        backgroundColor: '#777a7d',
                        height: mobileDisplay ? '80px' : '60px',
                        display: closeNotice ? 'flex' : 'none',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#fff',
                        padding: '0 0 0 10px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        <ErrorOutlineIcon />
                        <Typography
                            sx={{
                                fontSize: mobileDisplay ? '14px' : 'unset',
                            }}
                        >
                            Due to the ongoing development phase of Codebooker,
                            our search functionality is currently unavailable.
                            Kindly submit your queries via the form below.
                        </Typography>
                    </Box>
                    <ListItemIcon>
                        <CloseIcon
                            onClick={() => setCloseNotce(false)}
                            sx={{
                                color: '#fff',
                                cursor: 'pointer',
                            }}
                        />
                    </ListItemIcon>
                </Box>
                <Box
                    sx={{
                        maxWidth: mobileDisplay ? 'unset' : '1228px',
                        margin: '0 auto',
                    }}
                >
                    <nav className='help-navigation'>
                        <Typography
                            variant={`${matches ? 'h7' : 'h5'}`}
                            component='div'
                            sx={{
                                letterSpacing: '0.009em',
                                color: '#fff',
                                textAlign: 'center',
                            }}
                        >
                            CodeBooker Help
                        </Typography>
                        <Box
                            sx={{
                                display: mobileDisplay ? 'flex' : 'none',
                                width: '80%',
                            }}
                        >
                            <input
                                className='search'
                                type='text'
                                placeholder='How can we help?'
                            />
                        </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Tooltip title='Support settings'>
                                <IconButton
                                    onClick={handleClick}
                                    aria-controls={
                                        open ? 'account-menu' : undefined
                                    }
                                    aria-haspopup='true'
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    {mobileDisplay ? (
                                        <MenuIcon
                                            sx={{
                                                color: '#fff',
                                            }}
                                        />
                                    ) : (
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                            }}
                                        >
                                            {userName[0]}
                                        </Avatar>
                                    )}
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id='account-menu'
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
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
                                        transform:
                                            'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{
                                horizontal: 'right',
                                vertical: 'top',
                            }}
                            anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'bottom',
                            }}
                        >
                            {mobileDisplay && (
                                <div>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <Typography fontSize='14px'>
                                            Hi, {userName}
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                </div>
                            )}
                            <MenuItem>
                                <Typography fontSize='14px'>
                                    View your support cases
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => navigate('/')}>
                                <ListItemIcon>
                                    <HouseIcon />
                                </ListItemIcon>
                                <Typography fontSize='14px'>
                                    Go to Codebooker
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogOut}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize='small' />
                                </ListItemIcon>
                                <Typography fontSize='14px'>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </nav>
                </Box>
            </header>
            <Box
                sx={{
                    marginTop: closeNotice ? '120px' : '60px',
                    backgroundColor: '#1976d2',
                }}
            >
                <Box>
                    <Box
                        sx={{
                            borderTop: '1px solid #0091ca',
                            display: mobileDisplay ? 'none' : 'block',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                minHeight: '157px',
                                maxWidth: '768px',
                                margin: '0 auto',
                            }}
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    marginBottom: '12px',
                                    color: '#fff',
                                }}
                            >
                                Hi {userName}, Welcome to Codebooker Support.
                            </Typography>
                            <Box
                                sx={{
                                    maxWidth: '744px',
                                    padding: '8px 0',
                                }}
                            >
                                <form className='support-search-form'>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                        }}
                                    >
                                        <input
                                            type='text'
                                            placeholder='How can we help?'
                                            className='search'
                                        />
                                    </Box>
                                    <Button
                                        variant='outline'
                                        sx={{
                                            borderRadius: 'unset',
                                            height: '100%',
                                            border: '1px solid #fff',
                                        }}
                                    >
                                        <SearchIcon
                                            sx={{
                                                color: '#fff',
                                            }}
                                        />
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant='h5'
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    Please provide details of your support inquiry in the form
                    below.
                </Typography>
                <SupportForm />
            </Box>
        </div>
    );
};
export default Support;
