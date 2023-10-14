import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Grid,
    IconButton,
    InputLabel,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './CreateProfileForm.css';
import IDE_Options from './IDE_Options';
import SelectInputField from './SelectInputField';
import locationOptions from './locationOptions';
import operatingSystemOptions from './operatingSystemOptions';
import programingSkillOptions from './programingSkillOptions';

const CreateProfileForm = () => {
    const [loading, setLoading] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [createProfileError, setCreateProfileError] = useState('');
    const [showCity, setShowCity] = useState(null);
    const [showError, setShowError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const initialValue = {
        name: '',
        alias: '',
        location: '',
        city: showCity || '',
        age: '',
        education: '',
        occupation: '',
        operatingSystem: '',
        programingSkills: '',
        favoriteEditor: '',
        githubLink: '',
        portfolioURL: '',
        youtubeLink: '',
        linkedInLink: '',
        twitterLink: '',
        gitLab: '',
        showAge: false,
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('This field is required'),
        alias: Yup.string().required('This field is required'),
        location: Yup.string().required('This field is required'),
        city: Yup.string().required('This field is required'),
        age: Yup.string().required('This field is required'),
    });
    const getUserLocationDetails = async () => {
        const request = await fetch(
            'https://ipinfo.io/json?token=d6500264fdf697'
        );
        const { city } = await request.json();
        setShowCity(city);
    };
    const handleSubmit = async (values, onSubmitProps) => {
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:3001/api/profile/new-profile',
                {
                    values,
                    selectedFile,
                }
            );
            if (response.status === 200) {
                setShowSnackBar(true);
                setSelectedFile(null);
                onSubmitProps.resetForm();
            }
        } catch (err) {
            const errorMsg = err.response.data.message;
            setCreateProfileError(errorMsg);
            setShowError(true);
        }
        setLoading(false);
    };
    const closeSnackBar = () => {
        setShowSnackBar(false);
        setShowError(false);
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
        setSelectedFile(src);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={closeSnackBar}
                autoHideDuration={4000}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );
    const mobileDisplay = useMediaQuery('(max-width:912px)');
    useEffect(() => {
        getUserLocationDetails();
    }, []);
    return (
        <>
            <Snackbar
                action={action}
                open={showSnackBar}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message='Support Query Successfully Submitted'
            />
            <Snackbar
                action={action}
                open={showError}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message={createProfileError}
            />
            <Grid container>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            margin: '0 auto',
                            width: '90%',
                        }}
                    >
                        <Box m={5} p={mobileDisplay ? 1 : 3}>
                            <Formik
                                initialValues={initialValue}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    handleChange,
                                    handleBlur,
                                    touched,
                                    errors,
                                }) => {
                                    const {
                                        name,
                                        alias,
                                        location,
                                        age,
                                        city,
                                        showAge,
                                        education,
                                        occupation,
                                        programingSkills,
                                        operatingSystem,
                                        favoriteEditor,
                                        githubLink,
                                        portfolioURL,
                                        youtubeLink,
                                        linkedInLink,
                                        twitterLink,
                                        gitLab,
                                    } = values;
                                    return (
                                        <Form>
                                            <>
                                                <KeyboardBackspaceIcon
                                                    onClick={() =>
                                                        navigate('/')
                                                    }
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        left: '20px',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                                <Box>
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            marginBottom:
                                                                '10px',
                                                            textAlign:
                                                                mobileDisplay
                                                                    ? 'center'
                                                                    : 'unset',
                                                            fontSize:
                                                                mobileDisplay
                                                                    ? '20px'
                                                                    : 'auto',
                                                        }}
                                                    >
                                                        Basic Information
                                                    </Typography>
                                                    <Box className='flex'>
                                                        <Box>
                                                            <Box
                                                                sx={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                            >
                                                                <Box className='img-cta'>
                                                                    <img
                                                                        alt='Avatar'
                                                                        className='img'
                                                                        src={
                                                                            selectedFile
                                                                                ? selectedFile
                                                                                : '/Assets/Avatar.webp'
                                                                        }
                                                                    />
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        backgroundColor:
                                                                            '#171c259c',
                                                                        position:
                                                                            'absolute',
                                                                        top: '50%',
                                                                        left: '50%',
                                                                        transform:
                                                                            'translate(-50%, -50%)',
                                                                        cursor: 'pointer',
                                                                        display:
                                                                            'flex',
                                                                        justifyContent:
                                                                            'center',
                                                                        alignItems:
                                                                            'center',
                                                                        padding:
                                                                            '10px',
                                                                        borderRadius:
                                                                            '50%',
                                                                    }}
                                                                >
                                                                    <input
                                                                        hidden
                                                                        ref={
                                                                            fileRef
                                                                        }
                                                                        type='file'
                                                                        accept='image/*'
                                                                        onChange={
                                                                            handleFileInputChange
                                                                        }
                                                                    />
                                                                    <AddAPhotoOutlinedIcon
                                                                        onClick={
                                                                            selectImage
                                                                        }
                                                                        sx={{
                                                                            color: 'white',
                                                                        }}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Box className='input-field-cta'>
                                                            <TextField
                                                                label='Full Name'
                                                                name='name'
                                                                variant='outlined'
                                                                fullWidth
                                                                margin='dense'
                                                                value={name}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                helperText={
                                                                    <ErrorMessage name='name' />
                                                                }
                                                                error={
                                                                    errors.name &&
                                                                    touched.name
                                                                }
                                                                required
                                                            />
                                                            <TextField
                                                                label='Alias'
                                                                name='alias'
                                                                fullWidth
                                                                variant='outlined'
                                                                margin='dense'
                                                                value={alias}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                helperText={
                                                                    <ErrorMessage name='alias' />
                                                                }
                                                                error={
                                                                    errors.alias &&
                                                                    touched.alias
                                                                }
                                                                required
                                                            />
                                                            <TextField
                                                                label='Age'
                                                                name='age'
                                                                fullWidth
                                                                variant='outlined'
                                                                type='number'
                                                                margin='dense'
                                                                value={age}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                helperText={
                                                                    <ErrorMessage name='age' />
                                                                }
                                                                error={
                                                                    errors.age &&
                                                                    touched.age
                                                                }
                                                                required
                                                            />
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    marginBottom:
                                                                        '10px',
                                                                }}
                                                            >
                                                                <Field
                                                                    type='checkbox'
                                                                    as={
                                                                        Checkbox
                                                                    }
                                                                    value={
                                                                        showAge
                                                                    }
                                                                    name='showAge'
                                                                    checked={
                                                                        showAge
                                                                    }
                                                                />
                                                                <Typography
                                                                    sx={{
                                                                        fontSize:
                                                                            '12px',
                                                                    }}
                                                                >
                                                                    Would you
                                                                    like to
                                                                    display your
                                                                    age on your
                                                                    profile? If
                                                                    so, please
                                                                    check the
                                                                    checkbox.
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <InputLabel htmlFor='location'>
                                                                    Location
                                                                </InputLabel>
                                                                <SelectInputField
                                                                    name='location'
                                                                    options={{
                                                                        value: location,
                                                                        onChange:
                                                                            handleChange,
                                                                        onBlur: handleBlur,
                                                                        items: locationOptions,
                                                                        error:
                                                                            touched.location &&
                                                                            errors.location,
                                                                    }}
                                                                />
                                                            </Box>
                                                            <TextField
                                                                label='City'
                                                                name='city'
                                                                placeholder='New York'
                                                                fullWidth
                                                                variant='outlined'
                                                                margin='dense'
                                                                value={city}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                helperText={
                                                                    <ErrorMessage name='city' />
                                                                }
                                                                error={
                                                                    errors.city &&
                                                                    touched.city
                                                                }
                                                                required
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Divider
                                                    sx={{
                                                        mt: '20px',
                                                        mb: '20px',
                                                    }}
                                                />
                                                <Box>
                                                    <Box className='flex'>
                                                        <Box>
                                                            <Typography
                                                                variant='h5'
                                                                sx={{
                                                                    textAlign:
                                                                        mobileDisplay
                                                                            ? 'center'
                                                                            : 'unset',
                                                                    fontSize:
                                                                        mobileDisplay
                                                                            ? '20px'
                                                                            : 'auto',
                                                                }}
                                                            >
                                                                Professional /
                                                                Work Expericence
                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    paddingRight:
                                                                        '30px',
                                                                    display:
                                                                        mobileDisplay
                                                                            ? 'none'
                                                                            : 'unset',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize:
                                                                            '16px',
                                                                    }}
                                                                >
                                                                    Kindly
                                                                    provide
                                                                    details on
                                                                    any of the
                                                                    following:
                                                                </Typography>
                                                                <ul
                                                                    style={{
                                                                        fontSize:
                                                                            '14px',
                                                                    }}
                                                                >
                                                                    <li>
                                                                        Your
                                                                        latest
                                                                        educational
                                                                        background
                                                                    </li>
                                                                    <li>
                                                                        Current
                                                                        work
                                                                        experience
                                                                    </li>
                                                                    <li>
                                                                        Operating
                                                                        system
                                                                        preference
                                                                    </li>
                                                                    <li>
                                                                        Programming
                                                                        skills
                                                                    </li>
                                                                    <li>
                                                                        Preferred
                                                                        Integrated
                                                                        Development
                                                                        Environment
                                                                        (IDE).
                                                                    </li>
                                                                </ul>
                                                            </Box>
                                                        </Box>
                                                        <Box className='input-field-cta'>
                                                            <TextField
                                                                label='Education'
                                                                name='education'
                                                                variant='outlined'
                                                                fullWidth
                                                                margin='dense'
                                                                value={
                                                                    education
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />
                                                            <TextField
                                                                label='Occupation'
                                                                name='occupation'
                                                                fullWidth
                                                                variant='outlined'
                                                                margin='dense'
                                                                value={
                                                                    occupation
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />
                                                            <Box>
                                                                <InputLabel htmlFor='operatingSystem'>
                                                                    Operating
                                                                    System
                                                                </InputLabel>
                                                                <SelectInputField
                                                                    name='operatingSystem'
                                                                    options={{
                                                                        name: 'operatingSystem',
                                                                        value: operatingSystem,
                                                                        onChange:
                                                                            handleChange,
                                                                        onBlur: handleBlur,
                                                                        items: operatingSystemOptions,
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <InputLabel htmlFor='programingSkills'>
                                                                    Programming
                                                                    Skill
                                                                </InputLabel>
                                                                <SelectInputField
                                                                    name='programingSkills'
                                                                    options={{
                                                                        value: programingSkills,
                                                                        onChange:
                                                                            handleChange,
                                                                        onBlur: handleBlur,
                                                                        items: programingSkillOptions,
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Box>
                                                                <InputLabel htmlFor='favoriteEditor'>
                                                                    Favorite
                                                                    Editor / IDE
                                                                </InputLabel>
                                                                <SelectInputField
                                                                    name='favoriteEditor'
                                                                    options={{
                                                                        value: favoriteEditor,
                                                                        onChange:
                                                                            handleChange,
                                                                        onBlur: handleBlur,
                                                                        items: IDE_Options,
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Divider
                                                    sx={{
                                                        mt: '20px',
                                                        mb: '20px',
                                                    }}
                                                />
                                                <Box>
                                                    <Box className='flex'>
                                                        <Box flex={1}>
                                                            <Typography variant='h5'>
                                                                Socials
                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    paddingRight:
                                                                        '30px',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize:
                                                                            '14px',
                                                                    }}
                                                                >
                                                                    Include
                                                                    links to
                                                                    your:
                                                                </Typography>
                                                                <ul
                                                                    style={{
                                                                        fontSize:
                                                                            '14px',
                                                                    }}
                                                                >
                                                                    <li>
                                                                        Portfolio
                                                                        Website
                                                                        / CV
                                                                    </li>
                                                                    <li>
                                                                        GitHub
                                                                    </li>
                                                                    <li>
                                                                        GitLab
                                                                    </li>
                                                                    <li>
                                                                        Twitter
                                                                    </li>
                                                                    <li>
                                                                        LinkedIn
                                                                    </li>
                                                                    <li>
                                                                        YouTube
                                                                        Account
                                                                    </li>
                                                                </ul>
                                                            </Box>
                                                        </Box>
                                                        <Box className='input-field-cta'>
                                                            <TextField
                                                                label='GitHub'
                                                                name='githubLink'
                                                                variant='outlined'
                                                                placeholder='https://www.github.com/profile-name'
                                                                fullWidth
                                                                margin='dense'
                                                                value={
                                                                    githubLink
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />
                                                            <TextField
                                                                label='GitLab'
                                                                name='gitLab'
                                                                fullWidth
                                                                variant='outlined'
                                                                margin='dense'
                                                                placeholder='https://www.gitlab.com/profile-name'
                                                                value={gitLab}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />
                                                            <TextField
                                                                label='Personal Website URL'
                                                                name='portfolioURL'
                                                                fullWidth
                                                                placeholder='http://example.com/my-portfolio'
                                                                variant='outlined'
                                                                margin='dense'
                                                                value={
                                                                    portfolioURL
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />
                                                            <TextField
                                                                label='YouTube'
                                                                name='youtubeLink'
                                                                fullWidth
                                                                variant='outlined'
                                                                margin='dense'
                                                                placeholder='https://www.youtube.com/profile-name'
                                                                value={
                                                                    youtubeLink
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />
                                                            <TextField
                                                                label='LinkedIn'
                                                                name='linkedInLink'
                                                                fullWidth
                                                                variant='outlined'
                                                                margin='dense'
                                                                placeholder='http://linkedin.com/in/profile-name'
                                                                value={
                                                                    linkedInLink
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />
                                                            <TextField
                                                                label='Twitter'
                                                                name='twitterLink'
                                                                fullWidth
                                                                variant='outlined'
                                                                margin='dense'
                                                                placeholder='https://www.twitter.com/profile-name'
                                                                value={
                                                                    twitterLink
                                                                }
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Button
                                                    variant='contained'
                                                    type='submit'
                                                    color='primary'
                                                    disabled={loading}
                                                >
                                                    {loading && (
                                                        <CircularProgress
                                                            size={15}
                                                            sx={{ mr: '10px' }}
                                                            color='inherit'
                                                        />
                                                    )}
                                                    Submit
                                                </Button>
                                            </>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};
export default CreateProfileForm;
