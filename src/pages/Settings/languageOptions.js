import { appLanguageOptions } from './utils/i18n';
import { sortLangCodes } from './utils/language';
const sorted = sortLangCodes(appLanguageOptions.map((item) => item.code));

export const languageOptions = appLanguageOptions
    .sort((a, b) => sorted.indexOf(a.code) - sorted.indexOf(b.code))
    .map((opt) => ({
        id: opt.code,
        name: `${opt.name}${opt.nativeName ? ` — ${opt.nativeName}` : ''}`,
    }));
