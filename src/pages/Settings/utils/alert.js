import { atom } from 'recoil';

export const change = atom({
    key: 'checkedCheckboxes',
    default: [],
});
