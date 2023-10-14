import React from 'react';
import PropTypes from 'prop-types';
const OSSubMenu = ({ onOptionSelect }) => {
    const handleItemClick = (value) => {
        onOptionSelect(value);
    };
    return (
        <div className='sub-menu'>
            <ul>
                <li onClick={() => handleItemClick('Microsoft Windows')}>
                    Option 1
                </li>
                <li onClick={() => handleItemClick('Microsoft Windows')}>
                    Option 2
                </li>
                <li onClick={() => handleItemClick('Microsoft Windows')}>
                    Option 3
                </li>
            </ul>
        </div>
    );
};

OSSubMenu.propTypes = {
    onOptionSelect: PropTypes.func.isRequired,
};

export default OSSubMenu;
