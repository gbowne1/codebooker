import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
const SelectInputField = ({ name, value, options }) => {
    return (
        <FormControl variant='outlined' error={!!options.error} fullWidth>
            <Select
                name={name}
                value={value}
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
            <FormHelperText>{options.error || ' '}</FormHelperText>
        </FormControl>
    );
};
SelectInputField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.shape({
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
            })
        ).isRequired,
        error: PropTypes.string, // Optional error message
    }).isRequired,
};
export default SelectInputField;
