import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userSettingsAtom } from '../../pages/Settings/utils/alert';

const useCheckboxToggle = () => {
    const [error, setError] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [checkedCheckboxes, setCheckedCheckboxes] =
        useRecoilState(userSettingsAtom);
    const toggleSwitch = (e, type) => {
        const isChecked = e.target.checked;
        const id = e.target.name;
        if (isChecked) {
            setCheckedCheckboxes((prevObj) => {
                const updatedArrValues = [...prevObj];
                const existingIndex = updatedArrValues.findIndex(
                    (item) => item.name === type
                );
                if (existingIndex !== -1) {
                    updatedArrValues[existingIndex] = {
                        ...updatedArrValues[existingIndex],
                        values: [
                            ...updatedArrValues[existingIndex].values,
                            { name: id, status: isChecked },
                        ],
                    };
                } else {
                    updatedArrValues.push({
                        name: type,
                        values: [{ name: id, status: isChecked }],
                    });
                }
                return updatedArrValues;
            });
        } else {
            setCheckedCheckboxes((prevObj) => {
                const updatedArrValues = [...prevObj];
                const existingIndex = updatedArrValues.findIndex(
                    (item) => item.name === type
                );
                if (existingIndex !== -1) {
                    const newArray = updatedArrValues[
                        existingIndex
                    ].values.filter((value) => value.name !== id);
                    if (newArray.length === 0) {
                        updatedArrValues.splice(existingIndex, 1);
                    } else {
                        updatedArrValues[existingIndex] = {
                            ...updatedArrValues[existingIndex],
                            values: newArray,
                        };
                    }
                }
                return updatedArrValues;
            });
        }
    };

    const toggleCheckbox = (e) => {
        const isChecked = e.target.checked;
        const id = e.target.id;
        if (isChecked) {
            setCheckedCheckboxes((prevObj) => {
                const updatedArrValues = [...prevObj];
                const existingIndex = updatedArrValues.findIndex(
                    (item) => item.name === 'reading-preferences'
                );
                if (existingIndex !== -1) {
                    updatedArrValues[existingIndex] = {
                        ...updatedArrValues[existingIndex],
                        values: [...updatedArrValues[existingIndex].values, id],
                    };
                } else {
                    updatedArrValues.push({
                        name: 'reading-preferences',
                        values: [id],
                    });
                }
                return updatedArrValues;
            });
        } else {
            setCheckedCheckboxes((prevObj) => {
                const updatedArrValues = [...prevObj];
                const existingIndex = updatedArrValues.findIndex(
                    (item) => item.name === 'reading-preferences'
                );
                if (existingIndex !== -1) {
                    const newArray = updatedArrValues[
                        existingIndex
                    ].values.filter((value) => value !== id);
                    if (newArray.length === 0) {
                        updatedArrValues.splice(existingIndex, 1);
                    } else {
                        updatedArrValues[existingIndex] = {
                            ...updatedArrValues[existingIndex],
                            values: newArray,
                        };
                    }
                }
                return updatedArrValues;
            });
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const addAuthor = () => {
        const existingIndex = checkedCheckboxes.findIndex(
            (item) => item.name === 'authors'
        );
        const authorsArr = checkedCheckboxes[existingIndex]?.values;
        if (authorsArr?.includes(inputValue)) {
            setError(true);
            setInputValue('');
            return;
        }
        if (inputValue.trim() !== '') {
            // setNames([...names, inputValue.trim()]);
            setCheckedCheckboxes((prevObj) => {
                const updatedArrValues = [...prevObj];
                if (existingIndex !== -1) {
                    updatedArrValues[existingIndex] = {
                        ...updatedArrValues[existingIndex],
                        values: [
                            ...updatedArrValues[existingIndex].values,
                            inputValue.trim(),
                        ],
                    };
                } else {
                    updatedArrValues.push({
                        name: 'authors',
                        values: [inputValue.trim()],
                    });
                }
                return updatedArrValues;
            });
            setInputValue('');
        }
    };
    const removeAuthorName = (nameToRemove) => {
        setCheckedCheckboxes((prevObj) => {
            const updatedArrValues = [...prevObj];
            const existingIndex = updatedArrValues.findIndex(
                (item) => item.name === 'authors'
            );
            if (existingIndex !== -1) {
                const newArray = updatedArrValues[existingIndex].values.filter(
                    (value) => value !== nameToRemove
                );
                if (newArray.length === 0) {
                    updatedArrValues.splice(existingIndex, 1);
                } else {
                    updatedArrValues[existingIndex] = {
                        ...updatedArrValues[existingIndex],
                        values: newArray,
                    };
                }
            }
            return updatedArrValues;
        });
    };

    return {
        error,
        setError,
        inputValue,
        checkedCheckboxes,
        setCheckedCheckboxes,
        toggleSwitch,
        toggleCheckbox,
        handleInputChange,
        addAuthor,
        removeAuthorName,
    };
};

export default useCheckboxToggle;
