import { useState } from 'react';
import { change } from '../../pages/Settings/utils/alert';
import { useRecoilState } from 'recoil';

const useCheckboxToggle = () => {
    const [names, setNames] = useState([]);
    const [error, setError] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [checkedCheckboxes, setCheckedCheckboxes] = useRecoilState(change);

    const toggleSwitch = (e) => {
        const isChecked = e.target.checked;
        const id = e.target.name;
        if (isChecked) {
            setCheckedCheckboxes((prevObj) => [
                ...prevObj,
                { name: id, status: isChecked },
            ]);
        } else {
            setCheckedCheckboxes((prevObj) =>
                prevObj.filter((checkedId) => checkedId.name !== id)
            );
        }
    };

    const toggleCheckbox = (e) => {
        const isChecked = e.target.checked;
        const id = e.target.id;
        if (isChecked) {
            setCheckedCheckboxes((prevObj) => [
                ...prevObj,
                { name: id, status: isChecked },
            ]);
        } else {
            setCheckedCheckboxes((prevObj) =>
                prevObj.filter((checkedId) => checkedId.name !== id)
            );
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const addAuthor = () => {
        if (names.includes(inputValue)) {
            setError(true);
            setInputValue('');
            return;
        }
        if (inputValue.trim() !== '') {
            setNames([...names, inputValue.trim()]);
            setCheckedCheckboxes((prevObj) => {
                const updatedArrValues = [...prevObj];
                const existingIndex = updatedArrValues.findIndex(
                    (item) => item.name === 'authors'
                );
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
            // setCheckedCheckboxes([
            //     ...checkedCheckboxes,
            //     ...names,
            //     inputValue.trim(),
            // ]);
            setInputValue('');
        }
    };
    const removeAuthorName = (nameToRemove) => {
        setNames(names.filter((name) => name !== nameToRemove));
        setCheckedCheckboxes((prevObj) => {
            const updatedArrValues = [...prevObj];
            const existingIndex = updatedArrValues.findIndex(
                (item) => item.name === 'authors'
            );
            return updatedArrValues[existingIndex].values.filter(
                (name) => name !== nameToRemove
            );
        });
        // setCheckedCheckboxes(
        //     [...checkedCheckboxes].filter((name) => name !== nameToRemove)
        // );
    };

    return {
        names,
        error,
        setError,
        inputValue,
        setNames,
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
