import * as React from 'react';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PropTypes from 'prop-types';

export default function PopperPopupState({
    isDarkMode,
    filter,
    setFilter,
    matches,
}) {
    return (
        <PopupState
            variant='popper'
            popupId='demo-popup-popper'
            style={{ width: '100vw' }}
        >
            {(popupState) => (
                <div>
                    <div>
                        {' '}
                        {!popupState.isOpen && (
                            <SearchIcon
                                style={{ marginTop: '7px' }}
                                variant='contained'
                                {...bindToggle(popupState)}
                            />
                        )}
                    </div>

                    <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper
                                    elevation={3}
                                    style={{
                                        position: 'relative',
                                        top: '60px',
                                        minWidthwidth: '100%',
                                        zIndex: 999,
                                        ...TransitionProps.style,
                                    }}
                                >
                                    <div className='input_container'>
                                        <ArrowBackIosIcon
                                            style={{ size: '20px' }}
                                            variant='contained'
                                            {...bindToggle(popupState)}
                                        />
                                        <input
                                            placeholder='Search...'
                                            className={`search-input ${
                                                matches ? 'small' : ''
                                            }`}
                                            value={filter}
                                            onChange={(e) =>
                                                setFilter(e.target.value)
                                            }
                                            style={{
                                                minWidthwidth: '100%',
                                                color: `${
                                                    isDarkMode ? 'white' : ''
                                                }`,
                                            }}
                                        />
                                    </div>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            )}
        </PopupState>
    );
}

PopperPopupState.propTypes = {
    matches: PropTypes.bool,
    filter: PropTypes.string,
    setFilter: PropTypes.func,
    isDarkMode: PropTypes.bool,
};
