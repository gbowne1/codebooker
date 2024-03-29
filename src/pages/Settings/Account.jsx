import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React from 'react';

const Account = () => {
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    const { t } = useTranslation();
    return (
        <>
            <Box className='account'>
                <Typography variant='h2'>
                    {t('settings.account.title')}
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
                                {t('settings.account.subTitle')}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {t('settings.account.signedAs')} {userEmail}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                    marginBottom: '100px',
                }}
            >
                <h3>{t('settings.account.yourAccount')}</h3>
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
                        {t('settings.account.subText')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: '-20px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '90px',
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
                                {t(
                                    'settings.account.actions.updateEmail.title'
                                )}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {t('settings.account.actions.updateEmail.text')}
                            </Typography>
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{
                                    fontSize: '12px',
                                    marginTop: '10px',
                                }}
                            >
                                {t(
                                    'settings.account.actions.updateEmail.title'
                                )}
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '60px',
                            marginTop: '20px',
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
                                {t(
                                    'settings.account.actions.updatePassword.title'
                                )}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {t(
                                    'settings.account.actions.updatePassword.text'
                                )}
                            </Typography>
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{
                                    fontSize: '12px',
                                    marginTop: '10px',
                                    maxWidth: '270px',
                                }}
                            >
                                {t(
                                    'settings.account.actions.updatePassword.title'
                                )}
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '85px',
                            marginTop: '20px',
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
                                {t(
                                    'settings.account.actions.updateAvatar.title'
                                )}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {t(
                                    'settings.account.actions.updateAvatar.text'
                                )}
                            </Typography>
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{
                                    fontSize: '12px',
                                    marginTop: '10px',
                                    maxWidth: '270px',
                                }}
                            >
                                {t(
                                    'settings.account.actions.updateAvatar.title'
                                )}
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '90px',
                            marginTop: '20px',
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
                                {t('settings.account.actions.socialMedia.name')}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {t('settings.account.actions.socialMedia.text')}
                            </Typography>
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{
                                    fontSize: '12px',
                                    marginTop: '10px',
                                    maxWidth: '275px',
                                }}
                            >
                                {t(
                                    'settings.account.actions.socialMedia.title'
                                )}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default Account;
