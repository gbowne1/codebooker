import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { langCodes } from './utils/i18n';
import { languageOptions } from './languageOptions';
const LanguageSetting = () => {
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(() => {
        const savedEventData = localStorage.getItem('language');
        return savedEventData
            ? JSON.parse(savedEventData)
            : languageOptions[0].name;
    });
    const { t, i18n } = useTranslation();
    const openMenu = () => {
        setActive(!active);
    };
    const selectLanguage = (index) => {
        const lng = langCodes[index];
        i18n.changeLanguage(lng);
        setSelected(languageOptions[index].name);
        localStorage.setItem(
            'language',
            JSON.stringify(languageOptions[index].name)
        );
        localStorage.setItem('langCode', JSON.stringify(lng));
        setActive(false);
    };
    return (
        <>
            <Box className='language'>
                <Typography variant='h2'>{t('locale.title')}</Typography>
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
                                {t('locale.text')}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {t('locale.subText')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                    marginBottom: '50px',
                }}
            >
                <Box>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '120px',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        color: '#3884FF',
                                    }}
                                >
                                    {t('locale.language')}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '400px',
                                    position: 'relative',
                                }}
                            >
                                <div className='select-btn' onClick={openMenu}>
                                    <div className='inner-text'>
                                        <p className='default-lang'>
                                            {selected}
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
                                                            onClick={() =>
                                                                selectLanguage(
                                                                    idx
                                                                )
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
                                        {t('locale.fyi')}
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
export default LanguageSetting;
