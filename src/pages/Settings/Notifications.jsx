import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Switch, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Notifications.css';
import { languageOptions } from './languageOptions';
const Notifications = ({ checkedCheckboxes, toggleSwitch }) => {
    const [active, setActive] = useState(false);
    const [emailLang, setEmailLang] = useState(languageOptions[0].name);
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    const { t } = useTranslation();
    const matches = useMediaQuery('(max-width:820px)');
    const notIdx = checkedCheckboxes.findIndex(
        (item) => item.name === 'notification'
    );
    const isSwitchChecked = (name) =>
        checkedCheckboxes[notIdx]?.values?.some((item) => item.name === name);
    const changeLanguage = (e) => {
        setActive(!active);
    };
    const selectLanguage = (e) => {
        setEmailLang(e.target.textContent);
        setActive(false);
    };
    return (
        <>
            <Box className='notification'>
                <Typography variant='h2'>
                    {t('settings.notification.title')}
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
                            {t('settings.notification.subTitle')}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            {t('settings.notification.pushNot')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                }}
            >
                <h3>{t('settings.notification.name')}</h3>
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
                        {t('settings.notification.text')}
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
                                {t('settings.notification.pushOptions.title')}
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
                                        name='newBook'
                                        onChange={(e) =>
                                            toggleSwitch(e, 'notification')
                                        }
                                        checked={
                                            checkedCheckboxes.length > 0 &&
                                            isSwitchChecked('newBook')
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
                                            'settings.notification.pushOptions.newBook.type'
                                        )}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        {t(
                                            'settings.notification.pushOptions.newBook.text'
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
                                        name='recommendation'
                                        onChange={(e) =>
                                            toggleSwitch(e, 'notification')
                                        }
                                        checked={
                                            checkedCheckboxes.length > 0 &&
                                            isSwitchChecked('recommendation')
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
                                            'settings.notification.pushOptions.bookRecommendation.type'
                                        )}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        {t(
                                            'settings.notification.pushOptions.bookRecommendation.text'
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
                                        name='reviews'
                                        onChange={(e) =>
                                            toggleSwitch(e, 'notification')
                                        }
                                        checked={
                                            checkedCheckboxes.length > 0 &&
                                            isSwitchChecked('reviews')
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
                                            'settings.notification.pushOptions.bookReviewUpdate.type'
                                        )}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        {t(
                                            'settings.notification.pushOptions.bookReviewUpdate.text'
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '50px',
                    marginBottom: '100px',
                    borderTop: '1px solid #CCCCCC',
                }}
            >
                <h3> {t('settings.notification.emailOptions.title')}</h3>
                <Box>
                    <Box>
                        <Box
                            sx={{
                                marginTop: '-15px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {t('settings.notification.emailOptions.text')}{' '}
                                {userEmail}
                            </Typography>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: matches ? '20px' : '90px',
                                    marginTop: '40px',
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
                                            'settings.notification.emailOptions.heading'
                                        )}
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
                                                name='updates'
                                                onChange={(e) =>
                                                    toggleSwitch(
                                                        e,
                                                        'notification'
                                                    )
                                                }
                                                checked={
                                                    checkedCheckboxes.length >
                                                        0 &&
                                                    isSwitchChecked('updates')
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
                                                    'settings.notification.emailOptions.updates.type'
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {t(
                                                    'settings.notification.emailOptions.updates.text'
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
                                                name='tips'
                                                onChange={(e) =>
                                                    toggleSwitch(
                                                        e,
                                                        'notification'
                                                    )
                                                }
                                                checked={
                                                    checkedCheckboxes.length >
                                                        0 &&
                                                    isSwitchChecked('tips')
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
                                                    'settings.notification.emailOptions.tips.type'
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {t(
                                                    'settings.notification.emailOptions.tips.text'
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
                                                name='suggestions'
                                                onChange={(e) =>
                                                    toggleSwitch(
                                                        e,
                                                        'notification'
                                                    )
                                                }
                                                checked={
                                                    checkedCheckboxes.length >
                                                        0 &&
                                                    isSwitchChecked(
                                                        'suggestions'
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
                                                    'settings.notification.emailOptions.suggestions.type'
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {t(
                                                    'settings.notification.emailOptions.suggestions.text'
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '120px',
                                    marginTop: '40px',
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
                                            'settings.notification.locale.title'
                                        )}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: '400px',
                                        position: 'relative',
                                    }}
                                >
                                    <div
                                        className='select-btn'
                                        onClick={changeLanguage}
                                    >
                                        <div className='inner-text'>
                                            <p>
                                                {t(
                                                    'settings.notification.locale.defaultLang'
                                                )}
                                            </p>
                                            <p className='default-lang'>
                                                {emailLang}
                                            </p>
                                        </div>
                                        <ArrowDropDownIcon />
                                    </div>
                                    {active && (
                                        <div className='content'>
                                            <div className='content-list'>
                                                <ul>
                                                    {languageOptions.map(
                                                        (language, idx) => (
                                                            <li
                                                                onClick={
                                                                    selectLanguage
                                                                }
                                                                key={idx}
                                                            >
                                                                {language.name}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    <Box
                                        sx={{
                                            marginTop: '10px',
                                        }}
                                    >
                                        <Typography
                                            variant='h5'
                                            sx={{
                                                fontSize: '12px',
                                            }}
                                        >
                                            {t(
                                                'settings.notification.locale.text'
                                            )}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default Notifications;
Notifications.propTypes = {
    checkedCheckboxes: PropTypes.array,
    toggleSwitch: PropTypes.func,
    // boxRef: PropTypes.object,
};
