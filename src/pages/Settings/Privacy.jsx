import { Box, Switch, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './Privacy.css';
const Privacy = ({ checkedCheckboxes, toggleSwitch }) => {
    const matches = useMediaQuery('(max-width:820px)');
    const { t } = useTranslation();
    const privIdx = checkedCheckboxes.findIndex(
        (item) => item.name === 'privacy'
    );
    const isSwitchChecked = (name) =>
        checkedCheckboxes[privIdx]?.values?.some((item) => item.name === name);
    return (
        <>
            <Box className='privacy'>
                <Typography variant='h2'>
                    {t('settings.privacy.title')}
                </Typography>
                <Box>
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
                                {t('settings.privacy.text')}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                    lineHeight: '0',
                                }}
                            >
                                {t('settings.privacy.subText')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '50px',
                    marginBottom: '100px',
                }}
            >
                <Box
                    sx={{
                        marginTop: '-20px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: matches ? '20px' : '90px',
                        }}
                    >
                        <Box>
                            <Typography
                                variant='h6'
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 700,
                                }}
                            >
                                {t('settings.privacy.options.title')}
                            </Typography>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginTop: '-10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <Switch
                                        name='profile-visibility'
                                        onChange={(e) =>
                                            toggleSwitch(e, 'privacy')
                                        }
                                        checked={
                                            checkedCheckboxes.length > 0 &&
                                            isSwitchChecked(
                                                'profile-visibility'
                                            )
                                        }
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '15px',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {t(
                                            'settings.privacy.options.private.text'
                                        )}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        {t(
                                            'settings.privacy.options.private.subText'
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginTop: '20px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <Switch
                                        name='friends_only'
                                        onChange={(e) =>
                                            toggleSwitch(e, 'privacy')
                                        }
                                        checked={
                                            checkedCheckboxes.length > 0 &&
                                            isSwitchChecked('friends_only')
                                        }
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '15px',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {t(
                                            'settings.privacy.options.friendsOnly.text'
                                        )}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        {t(
                                            'settings.privacy.options.friendsOnly.subText'
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginTop: '20px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <Switch
                                        name='public'
                                        onChange={(e) =>
                                            toggleSwitch(e, 'privacy')
                                        }
                                        checked={
                                            checkedCheckboxes.length > 0 &&
                                            isSwitchChecked('public')
                                        }
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        marginTop: '15px',
                                    }}
                                >
                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {t(
                                            'settings.privacy.options.public.text'
                                        )}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        {t(
                                            'settings.privacy.options.public.subText'
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default Privacy;
Privacy.propTypes = {
    checkedCheckboxes: PropTypes.array,
    toggleSwitch: PropTypes.func,
};
