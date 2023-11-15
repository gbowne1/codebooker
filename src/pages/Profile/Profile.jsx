import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CssBaseline from '@mui/material/CssBaseline';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Typography,
    useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import CreateProfileForm from '../../components/FormikContainer/CreateProfileForm/CreateProfileForm';
import BookSearch from '../../components/BookSearch/BookSearch';
import './Profile.css';
import SideNav from '../../components/SideNav/SideNav';
import Dropdown from '../../components/Dropdown/Dropdown';
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

function Profile() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [createdOn, setCreatedOn] = useState();
    const [selectedFile, setSelectedFile] = useState(() => {
        let savedEventData = localStorage.getItem('savedImage');
        return savedEventData ? JSON.parse(savedEventData) : null;
    });
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const userAccountCreationDate = JSON.parse(
        localStorage.getItem('user')
    ).created_on.slice(0, 7);
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    const convertDateFormat = (dateString) => {
        // Split the date string into year and month components.
        const [year, month] = dateString.split('-');
        // Convert the month component to a string.
        const monthName = new Date(2000, month - 1, 1).toLocaleString('en-US', {
            month: 'long',
        });
        // Return the new date string in the format "Month YYYY".
        setCreatedOn(`${monthName} ${year}`);
    };
    const selectImage = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const src = URL.createObjectURL(file);
        // Convert the blob URL to a string
        const srcAsString = String(src);
        setSelectedFile(srcAsString);
        // Save the string in local storage
        localStorage.setItem('savedImage', JSON.stringify(srcAsString));
    };
    const getProfileDataFromDB = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                'http://localhost:3001/api/profile/get-profile'
            );
            if (response.status === 200) {
                setProfileData(response.data);
                setLoading(false);
            }
        } catch (error) {
            // Handle error
            console.error('Error fetching user profile:', error);
        }
        setLoading(false);
    };
    useEffect(() => {
        getProfileDataFromDB();
    }, []);
    useEffect(() => {
        convertDateFormat(userAccountCreationDate);
    }, [userAccountCreationDate]);
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
                                    letterSpacing: '0.009em',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate('/')}
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
                            <Dropdown />
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            <Box sx={{ marginTop: '60px' }}>
                {loading ? (
                    <div className='skeleton'>
                        <CircularProgress />
                    </div>
                ) : profileData ? (
                    <Box
                        justifyContent='center'
                        alignItems='center'
                        style={{ height: '100vh' }}
                    >
                        <Box>
                            <input
                                hidden
                                ref={fileRef}
                                type='file'
                                accept='image/*'
                                onChange={handleFileInputChange}
                            />
                            <Box
                                className='bg-top-cover'
                                onClick={selectImage}
                                sx={{
                                    backgroundImage: selectedFile
                                        ? `url(${selectedFile})`
                                        : 'none',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            >
                                {!selectedFile && (
                                    <Box className='profile-banner-prompt'>
                                        <Box>
                                            <ArrowCircleDownRoundedIcon
                                                sx={{
                                                    fontSize: '64px',
                                                }}
                                            />
                                        </Box>
                                        <button className='prompt-btn'>
                                            Add a Banner Image
                                        </button>
                                        <p className='asset-size'>
                                            Optimal dimensions 3200 x 410px
                                        </p>
                                    </Box>
                                )}
                            </Box>
                            <Box className='profile-wrap'>
                                <Box className='profile-card'>
                                    <Box sx={{ position: 'relative' }}>
                                        <Box
                                            sx={{
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <Box className='avatar-cta'>
                                                <img
                                                    src={
                                                        profileData?.profile_picture ||
                                                        'Assets/avatar-img.png'
                                                    }
                                                    alt='profile avatar'
                                                />
                                            </Box>
                                            <Box className='profile-card-mid'>
                                                <Typography
                                                    variant='h1'
                                                    sx={{
                                                        display: 'block',
                                                        fontSize: '18px',
                                                        fontWeight: 500,
                                                        height: '29px',
                                                        marginTop: '10px',
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {profileData?.alias}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        color: 'dimgrey',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        fontSize: '14px',
                                                        gap: '5px',
                                                        marginBottom: '20px',
                                                    }}
                                                >
                                                    <LocationOnRoundedIcon
                                                        sx={{
                                                            fontSize: '16px',
                                                        }}
                                                    />
                                                    <Typography variant='p'>
                                                        {profileData?.city},
                                                    </Typography>
                                                    <Typography variant='p'>
                                                        {profileData?.location}.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Button
                                                startIcon={<EditIcon />}
                                                variant='contained'
                                                fullWidth
                                                sx={{
                                                    borderRadius: '100px',
                                                    boxSizing: 'border-box',
                                                    fontSize: '14px',
                                                    textTransform: 'capitalize',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                Edit Your Profile
                                            </Button>
                                        </Box>
                                        <Box className='profile-info'>
                                            <Box
                                                sx={{
                                                    marginBottom: '5px',
                                                }}
                                            >
                                                <Typography
                                                    variant='h2'
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 500,
                                                        verticalAlign: 'middle',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                    }}
                                                >
                                                    Bio
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    borderTop:
                                                        '1px solid #dee8ff',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        marginTop: '10px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='p'
                                                        sx={{
                                                            color: '#707070',
                                                            lineHeight: '20px',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        {profileData?.bio}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                marginTop: '20px',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#707070',
                                                    fontSize: '11px',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                Joined {createdOn}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className='more-info-cta'>
                                    <Box className='more-info-sub-cta'>
                                        <Box>
                                            <Box className='more-info-header'>
                                                <Box>
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            fontSize: '16px',
                                                            color: '#1976d2',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        BASIC INFORMATION
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        height: '1px',
                                                        backgroundColor:
                                                            '#dee8ff',
                                                    }}
                                                ></Box>
                                            </Box>
                                            <Box>
                                                <Box>
                                                    <Typography
                                                        variant='h2'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#707070',
                                                        }}
                                                    >
                                                        Name:
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            height: '3px',
                                                            width: '40px',
                                                            backgroundColor:
                                                                '#70A3A3',
                                                        }}
                                                    ></Box>
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.name}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h2'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#707070',
                                                        }}
                                                    >
                                                        Age:
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            height: '3px',
                                                            width: '27px',
                                                            backgroundColor:
                                                                '#70A3A3',
                                                        }}
                                                    ></Box>
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.display_age
                                                            ? profileData?.age
                                                            : 'hidden'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            fontSize: '16px',
                                                            color: '#1976d2',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        PROFESSIONAL / WORK
                                                        EXPERIENCE
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        height: '1px',
                                                        backgroundColor:
                                                            '#dee8ff',
                                                    }}
                                                ></Box>
                                            </Box>
                                            <Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h2'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#707070',
                                                        }}
                                                    >
                                                        Education:
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            height: '3px',
                                                            width: '63px',
                                                            backgroundColor:
                                                                '#70A3A3',
                                                        }}
                                                    ></Box>
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.education ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#707070',
                                                        }}
                                                    >
                                                        Current Work Experience:
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            height: '3px',
                                                            width: '157px',
                                                            backgroundColor:
                                                                '#70A3A3',
                                                        }}
                                                    ></Box>
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.occupation ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h3'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#707070',
                                                        }}
                                                    >
                                                        Operating System
                                                        Preference:
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            height: '3px',
                                                            width: '183px',
                                                            backgroundColor:
                                                                '#70A3A3',
                                                        }}
                                                    ></Box>
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.operating_system ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h3'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#707070',
                                                        }}
                                                    >
                                                        Programing Skill:
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            height: '3px',
                                                            width: '105px',
                                                            backgroundColor:
                                                                '#70A3A3',
                                                        }}
                                                    ></Box>
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.skills ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '30px',
                                                    }}
                                                >
                                                    <Typography
                                                        variant='h3'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 500,
                                                            color: '#707070',
                                                        }}
                                                    >
                                                        Preferred IDE:
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            height: '3px',
                                                            width: '85px',
                                                            backgroundColor:
                                                                '#70A3A3',
                                                        }}
                                                    ></Box>
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.text_editor ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            fontSize: '16px',
                                                            color: '#1976d2',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        SOCIALS
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                        height: '1px',
                                                        backgroundColor:
                                                            '#dee8ff',
                                                    }}
                                                ></Box>
                                            </Box>
                                            <Box>
                                                <Box>
                                                    <GitHubIcon />
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.github ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    <LinkedInIcon />
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.linkedIn ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    <TwitterIcon />
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.twitter ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    <YouTubeIcon />
                                                    <Typography
                                                        variant='h4'
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: '30px',
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {profileData?.youtube ||
                                                            'null'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <CreateProfileForm />
                )}
            </Box>
        </ThemeProvider>
    );
}

export default Profile;
