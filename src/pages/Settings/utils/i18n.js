import i18n from 'i18next';
import { locale } from '../../../assets/languages';
import { initReactI18next } from 'react-i18next';
import { getLocaleInfo } from './language';

// Languages
export const langCodes = Object.keys(locale);
const savedLanguage = JSON.parse(localStorage.getItem('langCode'));
const resources = Object.fromEntries(
    Object.entries(locale).map((entry) => [entry[0], { translation: entry[1] }])
);
i18n.use(initReactI18next).init({
    fallbackLng: savedLanguage || 'en',
    resources,
    interpolation: {
        escapeValue: false,
    },
});

export const appLanguageOptions = langCodes.map((lang) => {
    const langObj = getLocaleInfo(lang);
    if (!langObj)
        throw new Error(
            `Language with code ${lang} cannot be found in database`
        );
    return langObj;
});
export default i18n;
