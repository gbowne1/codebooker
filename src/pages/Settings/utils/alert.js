import { atom } from 'recoil';
const settings = JSON.parse(localStorage.getItem('settings'));
export const userSettingsAtom = atom({
    key: 'userSettings',
    default: settings ?? [],
});
