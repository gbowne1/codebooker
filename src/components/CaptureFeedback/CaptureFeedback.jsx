import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './CaptureFeedback.css';

//Bind modal to your app
Modal.setAppElement('#root');

export function CaptureFeedback({ isActive, onClose }) {
    return (
        <Modal
            isOpen={isActive}
            onRequestClose={onClose}
            contentLabel='Feedback Modal'
            className='feedback-modal'
            overlayClassName='overlay'
        >
            <button className='close-button' onClick={onClose}>
                X
            </button>
        </Modal>
    );
}

CaptureFeedback.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
