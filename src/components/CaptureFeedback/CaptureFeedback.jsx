import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Rating } from 'react-simple-star-rating';
import './CaptureFeedback.css';

// Bind modal to app
Modal.setAppElement('#root');

// Validate direct feedback
const feedbackValidationSchema = Yup.object().shape({
    feedback: Yup.string()
        .trim()
        .required('Feedback is required')
        .max(2000, 'Feedback should not exceed 1000 characters'),
    rating: Yup.number()
        .required('Rating is required')
        .min(1, 'Rating should be at least 1')
        .max(5, 'Rating should not exceed 5'),
});

// Validate email feedback
const emailValidationSchema = Yup.object({
    message: Yup.string().required('Message is required'),
    rating: Yup.number().required('Rating is required'),
});

export function CaptureFeedback({ isActive, onClose }) {
    const [formToShow, setFormToShow] = useState('initial'); // State for which form to render
    const [rating, setRating] = useState(0); // State for rating

    // Switches form state
    const handleFormSwitch = (formType) => {
        setRating(0);
        setFormToShow(formType);
    };

    // Handle hover over rating component
    const onPointerMove = (value, index) => {
        setRating(value);
    };

    return (
        <Modal
            isOpen={isActive}
            onRequestClose={onClose}
            contentLabel='Feedback Modal'
            className='feedback-modal'
            overlayClassName='overlay'
        >
            {/* Modal close button */}
            <button className='close-button' onClick={onClose}>
                X
            </button>
            <div className='modal-form'>
                <h2>
                    We appreciate your feedback. <br></br> Please let us know
                    how we can improve.
                </h2>
                {/* INITIAL FORM */}
                {formToShow === 'initial' && (
                    <div className='button-group'>
                        <button onClick={() => handleFormSwitch('feedback')}>
                            Leave us a message
                        </button>
                        <button onClick={() => handleFormSwitch('email')}>
                            Send us an email
                        </button>
                    </div>
                )}
                {/* DIRECT FEEDBACK FORM */}
                {formToShow === 'feedback' && (
                    <Formik
                        initialValues={{ feedback: '', rating: '' }}
                        validationSchema={feedbackValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            fetch('/feedback/new', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    feedback: values.feedback,
                                    rating: values.rating,
                                    // ADD USER ID HERE
                                    // author:
                                }),
                            })
                                // Handle response
                                .then((response) => response.json())
                                .then((data) => {
                                    setSubmitting(false);
                                    onClose();
                                })
                                // Catch-all error
                                .catch((error) => {
                                    console.error(
                                        'There was an error submitting the feedback',
                                        error
                                    );
                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    as='textarea'
                                    name='feedback'
                                    className='feedback-textarea'
                                />
                                <div className='rating-container'>
                                    <Rating
                                        onPointerMove={onPointerMove}
                                        initialValue={rating}
                                    />
                                </div>
                                <div className='button-group'>
                                    <button
                                        type='button'
                                        onClick={() =>
                                            handleFormSwitch('initial')
                                        }
                                        className='back-button'
                                    >
                                        Back
                                    </button>
                                    <button
                                        type='submit'
                                        disabled={isSubmitting}
                                        className='submit-button'
                                    >
                                        Submit Feedback
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
                {/* EMAIL FEEDBACK FORM */}
                {formToShow === 'email' && (
                    <Formik
                        initialValues={{ email: '', message: '', rating: '' }}
                        validationSchema={emailValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            // Send email here

                            setSubmitting(false);
                            onClose();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    as='textarea'
                                    name='message'
                                    className='feedback-textarea'
                                />
                                <div className='rating-container'>
                                    <Rating
                                        onPointerMove={onPointerMove}
                                        initialValue={rating}
                                    />
                                </div>
                                <div className='button-group'>
                                    <button
                                        type='button'
                                        onClick={() =>
                                            handleFormSwitch('initial')
                                        }
                                        className='back-button'
                                    >
                                        Back
                                    </button>
                                    <button
                                        type='submit'
                                        disabled={isSubmitting}
                                        className='submit-button'
                                    >
                                        Submit Email
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </Modal>
    );
}

CaptureFeedback.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
