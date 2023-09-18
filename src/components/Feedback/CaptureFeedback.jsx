import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import DirectFeedback from './DirectFeedback';
import EmailFeedback from './EmailFeedback';
import Typography from '@mui/material/Typography';

export function CaptureFeedback({ isActive, onClose }) {
    Modal.setAppElement('#root');
    const [formToShow, setFormToShow] = useState('initialPrompt');
    const [rating, setRating] = useState(0);

    const handleFormSwitch = (formType) => {
        setRating(0);
        setFormToShow(formType);
    };

    const onPointerMove = (value) => {
        if (rating === 0) {
            setRating(value);
        }
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
                    <Typography
                        variant={'p'}
                        component='div'
                        className='feedback-header'
                        sx={{
                            flexGrow: 1,
                            letterSpacing: '0.009em',
                            marginTop: '1%',
                            marginBottom: '6%',
                            fontWeight: 'bold',
                        }}
                    >
                        We appreciate your feedback. <br />
                        Please let us know how we can improve.
                    </Typography>
                    {formToShow === 'initialPrompt' && (
                        <div className='button-group'>
                            <button
                                className='feedback-button'
                                onClick={() =>
                                    handleFormSwitch('directFeedback')
                                }
                            >
                                Leave us a message
                            </button>
                            <button
                                className='feedback-button'
                                onClick={() =>
                                    handleFormSwitch('emailFeedback')
                                }
                            >
                                Send us an email
                            </button>
                        </div>
                    )}
                    {formToShow === 'directFeedback' && (
                        <DirectFeedback
                            handleFormSwitch={handleFormSwitch}
                            rating={rating}
                            onPointerMove={onPointerMove}
                            setRating={setRating}
                            onClose={onClose}
                        />
                    )}
                    {formToShow === 'emailFeedback' && (
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
