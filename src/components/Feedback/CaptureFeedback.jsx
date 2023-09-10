import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import DirectFeedback from './DirectFeedback';
import EmailFeedback from './EmailFeedback';

Modal.setAppElement('#root');

export function CaptureFeedback({ isActive, onClose }) {
    const [formToShow, setFormToShow] = useState('initial');
    const [rating, setRating] = useState(0);

    const handleFormSwitch = (formType) => {
        setRating(0);
        setFormToShow(formType);
    };

    const onPointerMove = (value) => {
        setRating(value);
    };

    return (
        <React.Fragment>
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
                <div className='modal-form'>
                    <h2>
                        We appreciate your feedback. <br />
                        Please let us know how we can improve.
                    </h2>
                    {formToShow === 'initial' && (
                        <div className='button-group'>
                            <button
                                onClick={() => handleFormSwitch('feedback')}
                            >
                                Leave us a message
                            </button>
                            <button onClick={() => handleFormSwitch('email')}>
                                Send us an email
                            </button>
                        </div>
                    )}
                    {formToShow === 'feedback' && (
                        <DirectFeedback
                            handleFormSwitch={handleFormSwitch}
                            rating={rating}
                            onPointerMove={onPointerMove}
                            setRating={setRating}
                            onClose={onClose}
                        />
                    )}
                    {formToShow === 'email' && (
                        <EmailFeedback
                            handleFormSwitch={handleFormSwitch}
                            rating={rating}
                            onPointerMove={onPointerMove}
                            setRating={setRating}
                            onClose={onClose}
                        />
                    )}
                </div>
            </Modal>
            <Toaster />
        </React.Fragment>
    );
}

CaptureFeedback.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
