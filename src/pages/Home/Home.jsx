import NotificationsIcon from '@mui/icons-material/Notifications';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import BookSearch from '../../components/BookSearch/BookSearch';
import Dropdown from '../../components/Dropdown/Dropdown';
import Library from '../../components/Library/Library';
import SideNav from '../../components/SideNav/SideNav';
import CreateProfileAlert from '../Profile/CreateProfileAlert';
import './Home.css';

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
    },
});
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
    },
});

function Home() {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [filter, setFilter] = React.useState('');
    const location = useLocation();
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Manage Snackbar state and setup notify function
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [createProfileNotice, setCreateProfileNotice] = React.useState(false);
    const notify = (username) => {
        setSnackbarMessage('Welcome! ' + username);
        setOpenSnackbar(true);
    };
    const checkProfileExistenceInDB = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/api/profile/get-profile'
            );
            if (response.status === 200) return;
        } catch (error) {
            // Handle error
            if (error?.response?.status === 404) {
                setTimeout(() => {
                    setCreateProfileNotice(true);
                }, 2000);
            }
            console.error('Error fetching user profile:', error);
        }
    };
    // Hook used to track whether useEffect has run
    const hasRun = useRef(false);
    useEffect(() => {
        if (!hasRun.current) {
            if (location?.state?.loggin || localStorage.getItem('user')) {
                if (
                    location.state &&
                    location.state.loggin &&
                    localStorage.getItem('user')
                ) {
                    notify(JSON.parse(localStorage.getItem('user')).username);
                }
            }
            hasRun.current = true; //Toggle hasRun to true to prevent useEffect from running twice
        }
    }, [location.state]);
    useEffect(() => {
        checkProfileExistenceInDB();
    }, []);
    const matches = useMediaQuery('(max-width:700px)');
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <div className='App'>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar className='AppBar' position='fixed'>
                        <Toolbar>
                            <SideNav
                                setfilter={setFilter}
                                sx={{ margin: '0px' }}
                            />
                            <Typography
                                variant={`${matches ? 'h7' : 'h5'}`}
                                component='div'
                                sx={{
                                    flexGrow: 1,
                                }}
                            >
                                <div className='codebooker-logo'>
                                    <img
                                        src='Assets/codebooker-logo.png'
                                        alt='CodeBooker logo'
                                    />
                                    <div className='animate'></div>
                                </div>
                            </Typography>

                            <BookSearch
                                matches={matches}
                                filter={filter}
                                setFilter={setFilter}
                                isDarkMode={isDarkMode}
                            />
                            <NotificationsIcon size='small' />
                            <Switch
                                sx={{ marginLeft: '0.5rem' }}
                                size='small'
                                {...label}
                                inputProps={{ 'aria-label': 'controlled' }}
                                checked={isDarkMode}
                                onChange={handleToggleDarkMode}
                            />
                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                            <Dropdown />
                            {/* <SettingsIcon style={{marginLeft:20}} /> */}
                            {/* <Setting /> */}
                        </Toolbar>
                    </AppBar>
                </Box>
                <Library filter={filter} setFilter={setFilter} />
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity='success'
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {createProfileNotice && <CreateProfileAlert />}
        </ThemeProvider>
    );
}

export default Home;
