import React from 'react';
import './BookSearch.css';
import PropTypes from 'prop-types';
import PopperPopupState from '../SearchPopup/PopupState';

function SearchWindow({ matches, filter, setFilter, isDarkMode }) {
    return (
        <div className='search-window'>
            {matches ? (
                <PopperPopupState
                    isDarkMode={isDarkMode}
                    filter={filter}
                    setFilter={setFilter}
                    matches={matches}
                />
            ) : (
                <input
                    type='text'
                    placeholder='Search...'
                    className={`search-input ${matches ? 'small' : ''}`}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            )}
        </div>
    );
}

SearchWindow.propTypes = {
    matches: PropTypes.bool,
    filter: PropTypes.string,
    setFilter: PropTypes.func,
    isDarkMode: PropTypes.bool,
};

export default SearchWindow;
