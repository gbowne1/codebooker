import { React } from 'react';
import PropTypes from 'prop-types';
import './CaptureFeedback.css';

export function CaptureFeedback({ isActive, onClose }) {
    return (
        <div className={`feedback-panel ${isActive ? 'active' : ''}`}>
            <button className='close-button' onClick={onClose}>
                X
            </button>
        </div>
    );
}

CaptureFeedback.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
