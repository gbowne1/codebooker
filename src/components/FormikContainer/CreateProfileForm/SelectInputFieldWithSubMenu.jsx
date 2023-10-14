import { FormControl, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import './CreateProfileForm.css';

function SelectInputFiedWithSubMenu({ name, options }) {
    return (
        <FormControl variant='outlined' fullWidth>
            <Select
                name={name}
                value={options.value}
                onChange={options.onChange}
                onBlur={options.onBlur}
                fullWidth
            >
                {options.items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

SelectInputFiedWithSubMenu.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default SelectInputFiedWithSubMenu;
