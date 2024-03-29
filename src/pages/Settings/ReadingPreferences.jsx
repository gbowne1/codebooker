import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
const ReadingPreferences = ({
    names,
    error,
    setError,
    inputValue,
    toggleCheckbox,
    checkedCheckboxes,
    handleInputChange,
    addAuthor,
    removeAuthorName,
}) => {
    const { t } = useTranslation();
    const isSwitchChecked = (name) =>
        checkedCheckboxes.some((item) => item.name === name);
    console.log(checkedCheckboxes);
    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={() => setError(false)}
                autoHideDuration={4000}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );
    return (
        <>
            <Snackbar
                action={action}
                open={error}
                autoHideDuration={3000}
                onClose={() => setError(false)}
                message='Author name has already been added'
            />
            <Box className='preferences'>
                <Typography variant='h2'>
                    {t('settings.readingPreferences.title')}
                </Typography>
                <Box>
                    <Box
                        sx={{
                            paddingBottom: '50px',
                            borderBottom: '1px solid #CCCCCC',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '22px',
                                fontWeight: 500,
                                marginBottom: '10px',
                            }}
                        >
                            {t('settings.readingPreferences.text')}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            {t('settings.readingPreferences.subText')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                }}
            >
                <h3>{t('settings.readingPreferences.genre.title')}</h3>
                <Box
                    sx={{
                        paddingBottom: '50px',
                        marginTop: '-15px',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        {t('settings.readingPreferences.genre.text')}
                    </Typography>
                    <FormGroup>
                        <Grid
                            container
                            spacing={2}
                            marginTop='20px'
                            gap={1}
                            columns={{ xs: 2, sm: 2, md: 4 }}
                        >
                            <Grid
                                item
                                xs={2}
                                md={1}
                                sm={1}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isSwitchChecked(
                                                'Web Development'
                                            )}
                                            id='Web Development'
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Web Development'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={1}
                                sm={0.97}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Mobile App Development'
                                            checked={isSwitchChecked(
                                                'Mobile App Development'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Mobile App Development'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={1}
                                sm={1}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Data Science'
                                            checked={isSwitchChecked(
                                                'Data Science'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Data Science'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={0.9}
                                sm={0.97}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Machine Learning'
                                            checked={isSwitchChecked(
                                                'Machine Learning'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Machine Learning'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={1}
                                sm={1}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Artificial Intelligence'
                                            checked={isSwitchChecked(
                                                'Artificial Intelligence'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Artificial Intelligence'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={1}
                                sm={0.97}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Cybersecurity'
                                            checked={isSwitchChecked(
                                                'Cybersecurity'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Cybersecurity'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={1}
                                sm={1}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Game Development'
                                            checked={isSwitchChecked(
                                                'Game Development'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Game Development'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={0.9}
                                sm={0.97}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='DevOps'
                                            checked={isSwitchChecked('DevOps')}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='DevOps'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={1}
                                sm={1}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Cloud Computing'
                                            checked={isSwitchChecked(
                                                'Cloud Computing'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Cloud Computing'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={1}
                                sm={0.97}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Programming Languages'
                                            checked={isSwitchChecked(
                                                'Programming Languages'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Programming Languages'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={1}
                                sm={1}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Algorithms and Data Structures'
                                            checked={isSwitchChecked(
                                                'Algorithms and Data Structures'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Algorithms and Data Structures'
                                />
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                md={0.9}
                                sm={0.97}
                                sx={{
                                    backgroundColor: '#f7f7f7',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id='Software Engineering'
                                            checked={isSwitchChecked(
                                                'Software Engineering'
                                            )}
                                            onChange={toggleCheckbox}
                                        />
                                    }
                                    label='Software Engineering'
                                />
                            </Grid>
                        </Grid>
                    </FormGroup>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '-20px',
                    borderTop: '1px solid #CCCCCC',
                }}
            >
                <h3>{t('settings.readingPreferences.author.title')}</h3>
                <Box
                    sx={{
                        paddingBottom: '50px',
                        marginTop: '-15px',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        {t('settings.readingPreferences.author.text')}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                            maxWidth: '430px',
                            marginTop: '20px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                gap: '5px',
                                marginBottom: '10px',
                            }}
                        >
                            <Box flex={1}>
                                <TextField
                                    label='Author'
                                    fullWidth
                                    type='text'
                                    placeholder='Enter author name...'
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Button variant='contained' onClick={addAuthor}>
                                {t(
                                    'settings.readingPreferences.author.buttons.addAuthor'
                                )}
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}
                        >
                            {names.map((name, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        backgroundColor: '#e0e0e0',
                                        color: '#333',
                                        borderRadius: '4px',
                                        padding: '4px 8px',
                                        margin: '4px',
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {name}
                                    <Box
                                        onClick={() => removeAuthorName(name)}
                                        sx={{
                                            marginLeft: '14px',
                                            cursor: 'pointer',
                                            borderLeft: '1px solid #f7f7f7',
                                            paddingLeft: '5px',
                                            display: 'grid',
                                            placeItems: 'center',
                                        }}
                                    >
                                        <IconButton
                                            sx={{
                                                '&:hover': {
                                                    '& svg': {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '-20px',
                    borderTop: '1px solid #CCCCCC',
                }}
            >
                <h3>{t('settings.readingPreferences.readingGoal.title')}</h3>
                <Box
                    sx={{
                        paddingBottom: '50px',
                        marginTop: '-15px',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '14px',
                        }}
                    >
                        {t('settings.readingPreferences.readingGoal.text')}
                    </Typography>
                    <Box>
                        <Box
                            sx={{
                                marginTop: '20px',
                            }}
                        >
                            <Typography
                                variant='h2'
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    color: '#333333.',
                                    marginBottom: '10px',
                                }}
                            >
                                {t(
                                    'settings.readingPreferences.readingGoal.challenge.title'
                                )}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {t(
                                    'settings.readingPreferences.readingGoal.challenge.text'
                                )}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                marginTop: '10px',
                                gap: '20px',
                                width: '100%',
                                maxWidth: '420px',
                                borderTop: '1px solid #CCCCCC',
                                borderBottom: '1px solid #CCCCCC',
                                padding: '10px 0px 10px 0px',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '140px',
                                    height: '140px',
                                }}
                            >
                                <img
                                    src='Assets/book-img.png'
                                    alt='book'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    sx={{
                                        marginBottom: '10px',
                                    }}
                                >
                                    {t(
                                        'settings.readingPreferences.readingGoal.challenge.numOfBooks'
                                    )}
                                </Typography>
                                <input type='number' />
                                <Typography
                                    sx={{
                                        marginBottom: '10px',
                                        marginTop: '10px',
                                    }}
                                >
                                    {t(
                                        'settings.readingPreferences.readingGoal.challenge.completedIn'
                                    )}
                                </Typography>
                                <Button variant='contained'>
                                    {t(
                                        'settings.readingPreferences.readingGoal.challenge.button'
                                    )}
                                </Button>
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: '12px',
                                marginTop: '10px',
                            }}
                        >
                            {t(
                                'settings.readingPreferences.readingGoal.challenge.fyi'
                            )}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ReadingPreferences;
ReadingPreferences.propTypes = {
    checkedCheckboxes: PropTypes.array,
    names: PropTypes.array,
    setError: PropTypes.func,
    error: PropTypes.bool,
    inputValue: PropTypes.string,
    toggleCheckbox: PropTypes.func,
    handleInputChange: PropTypes.func,
    addAuthor: PropTypes.func,
    removeAuthorName: PropTypes.func,
};
