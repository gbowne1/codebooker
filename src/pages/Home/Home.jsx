import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CssBaseline from '@mui/material/CssBaseline';
import Library from '../../components/Library/Library';
import SideNav from '../../components/SideNav/SideNav';
import BookSearch from '../../components/BookSearch/BookSearch';
import Dropdown from '../../components/Dropdown/Dropdown';
import useMediaQuery from '@mui/material/useMediaQuery';

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

    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

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
                                sx={{ flexGrow: 1, letterSpacing: '0.009em' }}
                            >
                                CodeBooker
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
                <Library filter={filter} />
            </div>
        </ThemeProvider>
    );
}

export default Home;
