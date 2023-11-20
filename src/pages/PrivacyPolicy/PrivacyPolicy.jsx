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
                                Privacy policy
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
                                    Updated
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
                                        CodeBooker website is owned by Gregory
                                        Bowne, which is a data controller of
                                        your personal data. We have adopted this
                                        Privacy Policy, which determines how we
                                        are processing the information collected
                                        by CodeBooker, which also provides the
                                        reasons why we must collect certain
                                        personal data about you. Therefore, you
                                        must read this Privacy Policy before
                                        using CodeBooker website.We take care of
                                        your personal data and undertake to
                                        guarantee its confidentiality and
                                        security.
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
                                        1. Personal information we collect:
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        When you visit the CodeBooker, we
                                        automatically collect certain
                                        informationabout your device, including
                                        information about your web browser, IP
                                        address, time zone, and some of the
                                        installed cookies on your device.
                                        Additionally, as you browse the Site, we
                                        collect information about the individual
                                        web pages or products you view, what
                                        websites or search terms referred you to
                                        the Site, and how you interact with the
                                        Site.We refer to this
                                        automatically-collected information
                                        “Device Information.” Moreover, we might
                                        collect the personal data you provide to
                                        us (including but not limited to Name,
                                        Surname, Address, payment information,
                                        etc.) during registration to be able to
                                        fulfill the agreement.
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
                                        2. Why do we process your data?
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        Our top priority is customer data
                                        security, and, as such, we may process
                                        only minimal user data, only as much as
                                        it is absolutely necessary to maintain
                                        the website. Information collected
                                        automatically is used only to identify
                                        potential cases of abuse and establish
                                        statistical information regarding
                                        website usage. This statistical
                                        information is not otherwise aggregated
                                        in such a way that it would identify any
                                        particular user of the system. You can
                                        visit the website without telling us who
                                        you are or revealing any information, by
                                        which someone could identify youas a
                                        specific, identifiable individual. If,
                                        however, you wish to use some of the
                                        website’s features, or you wish to
                                        receive our newsletter or provide other
                                        details by filling a form, you may
                                        provide personal data to us, such as
                                        your email, first name, last name, city
                                        of residence, organization, telephone
                                        number. You can choose not to provide us
                                        with your personal data, but then you
                                        may not be able to take advantage of
                                        some of the website’s features. For
                                        example, you won’t be able to receive
                                        our Newsletter or contact us directly
                                        from the website. Users who are
                                        uncertain about what information is
                                        mandatory are welcome to contact us via
                                        example@gmail.com.
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
                                        3. Your rights:
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                        }}
                                    >
                                        If you are a European resident, you have
                                        the following rights related to your
                                        personal data:
                                    </Typography>
                                    <ul className='list'>
                                        <li>The right to be informed.</li>
                                        <li>The right of access.</li>
                                        <li>The right to rectification.</li>
                                        <li>The right to erasure.</li>
                                        <li>
                                            The right to restrict processing.
                                        </li>
                                        <li> The right to data portability.</li>
                                        <li>The right to object.</li>
                                        <li>
                                            Rights in relation to automated
                                            decision-making and profiling.
                                        </li>
                                    </ul>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        If you would like to exercise this
                                        right, please contact us through the
                                        contact information below. Additionally,
                                        if you are a European resident, we note
                                        that we are processing your information
                                        in order to fulfill contracts we might
                                        have with you (for example, if you make
                                        an order through the Site), or otherwise
                                        to pursue our legitimate business
                                        interests listed above. Additionally,
                                        please note that your information might
                                        be transferred outside of Europe,
                                        including Canada and the United States.
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
                                        4. Links to other websites:
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        Our website may contain links to other
                                        websites that are not owned or
                                        controlled by us. Please be aware that
                                        we are not responsible for such other
                                        websites or third parties privacy
                                        practices. We encourage you to be aware
                                        when you leave our website and read the
                                        privacy statements of each website that
                                        may collect personal information.
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
                                        5. Information security:
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        We secure information you provide on
                                        computer servers in a controlled, secure
                                        environment, protected from unauthorized
                                        access, use, or disclosure. We keep
                                        reasonable administrative, technical,
                                        and physical safeguards to protect
                                        against unauthorized access, use,
                                        modification, and personal data
                                        disclosure in its control and custody.
                                        However, no data transmission over the
                                        Internet or wireless network can be
                                        guaranteed.
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
                                        6. Legal disclosure:
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        We will disclose any information we
                                        collect, use or receive if required or
                                        permitted by law, such as to comply with
                                        a subpoena or similar legal process, and
                                        when we believe in good faith that
                                        disclosure is necessary to protect our
                                        rights, protect your safety or the
                                        safety of others, investigate fraud, or
                                        respond to a government request.
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
                                        7. Contact information:
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontSize: '16px',
                                            textAlign: 'justify',
                                        }}
                                    >
                                        If you would like to contact us to
                                        understand more about this Policy or
                                        wish to contact us concerning any matter
                                        relating to individual rights and your
                                        Personal Information, you may send an
                                        email to example@gmail.com;
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
