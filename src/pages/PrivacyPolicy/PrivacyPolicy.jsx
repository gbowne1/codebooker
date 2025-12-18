import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Switch from '@mui/material/Switch';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Typography, useMediaQuery } from '@mui/material';
import SideNav from '../../components/SideNav/SideNav';
import BookSearch from '../../components/BookSearch/BookSearch';
import Dropdown from '../../components/Dropdown/Dropdown';
import './PrivacyPolicy.css';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
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
const PrivacyPolicy = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [filter, setFilter] = useState('');
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    const navigate = useNavigate();
    const { t } = useTranslation();
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
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate('/')}
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
                            <Dropdown />
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            <Box sx={{ marginTop: '60px', background: 'background.paper' }}>
                <Box className='privacy-wrapper'>
                    <Box className='privacy-header-cta'>
                        <Box className='privacy-title'>
                            <Typography
                                variant='h1'
                                sx={{
                                    fontSize: matches ? '2.625rem' : '3.625rem',
                                    lineHeight: '110%',
                                    letterSpacing: '-.01em',
                                }}
                            >
                                {t('privacy.title')}
                            </Typography>
                        </Box>
                        <Box className='mt-spacing'>
                            <Box className='update-info'>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        fontSize: '1rem',
                                        lineHeight: '130%',
                                        fontWeight: '600',
                                        letterSpacing: '0',
                                    }}
                                >
                                    {t('privacy.update')}
                                </Typography>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        fontSize: '1rem',
                                        lineHeight: '130%',
                                        letterSpacing: '0',
                                    }}
                                >
                                    November 17, 2023
                                </Typography>
                            </Box>
                            <Box className='main-text'>
                                <Box>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {t('privacy.about')}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingBottom: '2rem',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: matches
                                                ? '1.3rem'
                                                : '2rem',
                                            fontWeight: '600',
                                            lineHeight: '130%',
                                        }}
                                    >
                                        1.
                                        {t(
                                            'privacy.options.personalInfo.title'
                                        )}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {t('privacy.options.personalInfo.text')}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingBottom: '2rem',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: matches
                                                ? '1.3rem'
                                                : '2rem',
                                            fontWeight: '600',
                                            lineHeight: '130%',
                                        }}
                                    >
                                        2. {t('privacy.options.data.title')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {t('privacy.options.data.text')}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingBottom: '2rem',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: matches
                                                ? '1.3rem'
                                                : '2rem',
                                            fontWeight: '600',
                                            lineHeight: '130%',
                                        }}
                                    >
                                        3. {t('privacy.options.rights.title')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                        }}
                                    >
                                        {t('privacy.options.rights.text')}
                                    </Typography>
                                    <ul className='list'>
                                        <li>
                                            {t('privacy.options.rights.r1')}
                                        </li>
                                        <li>
                                            {t('privacy.options.rights.r2')}
                                        </li>
                                        <li>
                                            {t('privacy.options.rights.r3')}
                                        </li>
                                        <li>
                                            {t('privacy.options.rights.r4')}
                                        </li>
                                        <li>
                                            {t('privacy.options.rights.r5')}
                                        </li>
                                        <li>
                                            {t('privacy.options.rights.r6')}
                                        </li>
                                        <li>
                                            {t('privacy.options.rights.r7')}
                                        </li>
                                        <li>
                                            {t('privacy.options.rights.r8')}
                                        </li>
                                    </ul>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {t('privacy.options.rights.subText')}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingBottom: '2rem',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: matches
                                                ? '1.3rem'
                                                : '2rem',
                                            fontWeight: '600',
                                            lineHeight: '130%',
                                        }}
                                    >
                                        4. {t('privacy.options.links.title')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {t('privacy.options.links.text')}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingBottom: '2rem',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: matches
                                                ? '1.3rem'
                                                : '2rem',
                                            fontWeight: '600',
                                            lineHeight: '130%',
                                        }}
                                    >
                                        5. {t('privacy.options.security.title')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {t('privacy.options.security.text')}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingBottom: '2rem',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: matches
                                                ? '1.3rem'
                                                : '2rem',
                                            fontWeight: '600',
                                            lineHeight: '130%',
                                        }}
                                    >
                                        6. {t('privacy.options.legal.title')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {t('privacy.options.legal.text')}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingBottom: '2rem',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: matches
                                                ? '1.3rem'
                                                : '2rem',
                                            fontWeight: '600',
                                            lineHeight: '130%',
                                        }}
                                    >
                                        7. {t('privacy.options.contact.title')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        {t('privacy.options.contact.text')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default PrivacyPolicy;
