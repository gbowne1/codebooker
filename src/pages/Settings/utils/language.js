import countryLanguages from '@ladjs/country-language';
import { getTag } from '@sozialhelden/ietf-language-tags';
const languageOrder = ['en', 'fr', 'es'];

const defaultLanguageCodes = [
    'ar-SA',
    'bg-BG',
    'bn-BD',
    'cs-CZ',
    'ca-AD',
    'de-DE',
    'el-GR',
    'en-US',
    'es-ES',
    'et-EE',
    'fa-IR',
    'fr-FR',
    'gl-ES',
    'gu-IN',
    'he-IL',
    'id-ID',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'lv-LV',
    'ne-NP',
    'nl-NL',
    'pl-PL',
    'pt-BR',
    'ru-RU',
    'sl-SI',
    'sv-SE',
    'ta-LK',
    'th-TH',
    'tr-TR',
    'vi-VN',
    'zh-CN',
];

function populateLanguageCode(language) {
    if (language.includes('-')) return language;
    if (language.length !== 2) return language;
    return (
        defaultLanguageCodes.find((v) => v.startsWith(`${language}-`)) ??
        language
    );
}

export function sortLangCodes(langCodes) {
    const languagesOrder = [...languageOrder].reverse();
    const results = langCodes.sort((a, b) => {
        const langOrderA = languagesOrder.findIndex(
            (v) => a.startsWith(`${v}-`) || a === v
        );
        const langOrderB = languagesOrder.findIndex(
            (v) => b.startsWith(`${v}-`) || b === v
        );
        if (langOrderA !== -1 || langOrderB !== -1)
            return langOrderB - langOrderA;

        return a.localeCompare(b);
    });

    return results;
}

export function getLocaleInfo(locale) {
    const realLocale = populateLanguageCode(locale);
    const tag = getTag(realLocale, true);
    if (!tag?.language?.Subtag) return null;
    let output = null;
    countryLanguages.getLanguage(tag.language.Subtag, (_err, lang) => {
        if (lang) output = lang;
    });
    if (!output) return null;

    const extras = [];
    if (tag.region?.Description) extras.push(tag.region.Description[0]);
    if (tag.script?.Description) extras.push(tag.script.Description[0]);
    const extraStringified = extras.map((v) => `(${v})`).join(' ');
    return {
        code: tag.parts.langtag ?? realLocale,
        isRtl: output.direction === 'RTL',
        name: output.name[0] + (extraStringified ? ` ${extraStringified}` : ''),
        nativeName: output.nativeName[0] || undefined,
    };
}
