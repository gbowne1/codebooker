import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userSettingsAtom } from './utils/alert';
import { isEqual } from 'lodash';
// import Alert from '@mui/material/Alert';
import {
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Snackbar,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import BookSearch from '../../components/BookSearch/BookSearch';
import Dropdown from '../../components/Dropdown/Dropdown';
import useCheckboxToggle from '../../components/Hooks/useCheckBoxToggle';
import useProfileData from '../../components/Hooks/useProfileData';
import SideNav from '../../components/SideNav/SideNav';
import Account from './Account';
import LanguageSetting from './LanguageSetting';
import Notifications from './Notifications';
import Privacy from './Privacy';
import ReadingPreferences from './ReadingPreferences';
import './Settings.css';
import axios from 'axios';
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

const Settings = () => {
    const [activeLink, setActiveLink] = useState('');
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarErrorState, setSnackBarErrorState] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [unSavedSettings, setUnsavedSettings] =
        useRecoilState(userSettingsAtom);
    const [filter, setFilter] = useState('');
    //get loggedIn user email
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    //get loggedIn user name
    const userName = JSON.parse(localStorage.getItem('user')).username;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    const {
        error,
        setError,
        inputValue,
        checkedCheckboxes,
        toggleCheckbox,
        toggleSwitch,
        handleInputChange,
        addAuthor,
        removeAuthorName,
    } = useCheckboxToggle();
    const { profileData } = useProfileData();
    const matches = useMediaQuery('(max-width:820px)');
    const prevSettings = JSON.parse(localStorage.getItem('settings')) ?? [];
    const isSettingsChanged = isEqual(prevSettings, unSavedSettings);
    const sidebarLinks = [
        {
            name: t('settings.account.title'),
            id: 'account',
            icon: (
                <PersonIcon
                    sx={{
                        marginRight: '10px',
                        color: '#1976d2',
                    }}
                />
            ),
        },
        {
            name: t('settings.notification.title'),
            id: 'notification',
            icon: (
                <NotificationAddIcon
                    sx={{
                        marginRight: '10px',
                        color: '#1976d2',
                    }}
                />
            ),
        },
        {
            name: t('settings.privacy.title'),
            id: 'privacy',
            icon: (
                <LockIcon
                    sx={{
                        marginRight: '10px',
                        color: '#1976d2',
                    }}
                />
            ),
        },
        {
            name: t('settings.readingPreferences.title'),
            id: 'preferences',
            icon: (
                <MenuBookIcon
                    sx={{
                        marginRight: '10px',
                        color: '#1976d2',
                    }}
                />
            ),
        },
        {
            name: t('locale.title'),
            id: 'language',
            icon: (
                <LanguageIcon
                    sx={{
                        marginRight: '10px',
                        color: '#1976d2',
                    }}
                />
            ),
        },
    ];
    useEffect(() => {
        function recheck() {
            const windowHeight =
                window.innerHeight || document.documentElement.clientHeight;
            const centerTarget = windowHeight / 4;
            const viewList = sidebarLinks
                .map((link) => {
                    const el = document.querySelector(`.${link.id}`);
                    if (!el) return { distance: Infinity, link: link.id };
                    const rect = el.getBoundingClientRect();
                    const distanceTop = Math.abs(centerTarget - rect.top);
                    const distanceBottom = Math.abs(centerTarget - rect.bottom);
                    const distance = Math.min(distanceBottom, distanceTop);
                    return { distance, link: link.id };
                })
                .sort((a, b) => a.distance - b.distance);
            // Check if user has scrolled past the bottom of the page
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                setActiveLink(sidebarLinks[sidebarLinks.length - 1].id);
            } else {
                // shortest distance to the part of the screen we want is the active link
                setActiveLink(viewList[0]?.link ?? '');
            }
        }
        document.addEventListener('scroll', recheck);
        recheck();
        return () => {
            document.removeEventListener('scroll', recheck);
        };
    }, []);
    const scrollTo = useCallback((id) => {
        const el = document.querySelector(id);
        if (!el) return null;
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: y - 120,
            behavior: 'smooth',
        });
    }, []);
    const cancelUnsavedSettings = () => {
        setUnsavedSettings(prevSettings);
    };
    const handleUserSettings = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:3001/api/settings/user-settings',
                { checkedCheckboxes, userEmail }
            );

            if (response.status === 200) {
                setShowSnackBar(true);
                localStorage.setItem(
                    'settings',
                    JSON.stringify(checkedCheckboxes)
                );
                setUnsavedSettings(checkedCheckboxes);
            }
        } catch (err) {
            const errorMsg = err.response.data.message;
            setShowSnackBar(true);
            setShowErrorMsg(errorMsg);
        }
        setLoading(false);
    };
    const closeSnackBar = () => {
        setShowSnackBar(false);
        setSnackBarErrorState(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={closeSnackBar}
                autohideduration={4000}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Snackbar
                action={action}
                open={showSnackBar}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message='User settings added successfully'
            />
            <Snackbar
                action={action}
                open={snackBarErrorState}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message={showErrorMsg}
            />
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
            <Box className='settings-container'>
                <nav
                    className={matches ? 'hide' : ''}
                    style={{
                        height: '100%',
                    }}
                >
                    <Typography variant='h6' sx={{ color: '#fff' }}>
                        {t('settings.title')}
                    </Typography>
                    <Box>
                        <Box className='top'>
                            <Box className='user-avatar'>
                                <img
                                    src={
                                        profileData?.profile_picture ||
                                        'Assets/avatar-img.png'
                                    }
                                    alt='profile avatar'
                                />
                            </Box>
                            <Box className='user-info'>
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        color: '#fff',
                                    }}
                                >
                                    {userName}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        color: '#fff',
                                    }}
                                >
                                    {userEmail}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                    </Box>
                    <Box
                        sx={{
                            marginTop: '20px',
                        }}
                    >
                        {sidebarLinks.map((sidebarLink) => (
                            <Box
                                className={activeLink}
                                key={sidebarLink.id}
                                sx={{
                                    height: '40px',
                                    backgroundColor:
                                        sidebarLink.id === activeLink &&
                                        '#b1adc7',
                                    display: 'flex',
                                    alignItems: 'center',
                                    textAlign: 'left',
                                    paddingLeft: '5px',
                                    color: '#fff',
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onClick={() => scrollTo(`.${sidebarLink.id}`)}
                            >
                                {sidebarLink.icon}
                                {sidebarLink.name}
                            </Box>
                        ))}
                    </Box>
                </nav>
                <main>
                    <Account />
                    <Notifications
                        checkedCheckboxes={checkedCheckboxes}
                        toggleSwitch={toggleSwitch}
                    />
                    <Privacy
                        checkedCheckboxes={checkedCheckboxes}
                        toggleSwitch={toggleSwitch}
                    />
                    <ReadingPreferences
                        error={error}
                        setError={setError}
                        toggleCheckbox={toggleCheckbox}
                        checkedCheckboxes={checkedCheckboxes}
                        handleInputChange={handleInputChange}
                        addAuthor={addAuthor}
                        removeAuthorName={removeAuthorName}
                        inputValue={inputValue}
                    />
                    <LanguageSetting />
                </main>
                {!isSettingsChanged && (
                    <div className='alert'>
                        <Box>
                            <Typography variant='h6' sx={{ color: '#fff' }}>
                                {t('settings.alert')}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: matches ? '100vw' : 'auto',
                                display: 'flex',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <Button
                                size={matches ? 'small' : 'medium'}
                                onClick={cancelUnsavedSettings}
                                variant='outlined'
                            >
                                {t('home.buttons.cancel')}
                            </Button>
                            <Button
                                onClick={handleUserSettings}
                                size={matches ? 'small' : 'medium'}
                                variant='contained'
                                sx={{
                                    marginLeft: matches ? 'unset' : '20px',
                                }}
                                disabled={loading}
                            >
                                {loading && (
                                    <CircularProgress
                                        size={15}
                                        sx={{ mr: '10px' }}
                                        color='inherit'
                                    />
                                )}
                                {t('home.buttons.save')}
                            </Button>
                        </Box>
                    </div>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default Settings;
