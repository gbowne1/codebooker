import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Rating } from 'react-simple-star-rating';
import './CaptureFeedback.css';

// Bind modal to your app
Modal.setAppElement('#root');

const feedbackValidationSchema = Yup.object({
    feedback: Yup.string().required('Feedback is required'),
    rating: Yup.number().required('Rating is required'),
});

const emailValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Message is required'),
    rating: Yup.number().required('Rating is required'),
});

export function CaptureFeedback({ isActive, onClose }) {
    const [formToShow, setFormToShow] = useState('initial');
    const [rating, setRating] = useState(0);

    const handleFormSwitch = (formType) => {
        setRating(0);
        setFormToShow(formType);
    };

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
            <button className='close-button' onClick={onClose}>
                X
            </button>
            <div className='modal-form'>
                <h2>
                    We appreciate your feedback. <br></br> Please let us know
                    how we can improve.
                </h2>
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
                            // Send feedback to backend here

                            setSubmitting(false);
                            onClose();
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
                            // Send email to backend here

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
