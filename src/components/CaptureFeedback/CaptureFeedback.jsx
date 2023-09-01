import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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

    const handleFormSwitch = (formType) => {
        setFormToShow(formType);
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
                    <div>
                        <button onClick={() => handleFormSwitch('feedback')}>
                            Leave us a message
                        </button>
                        <button onClick={() => handleFormSwitch('email')}>
                            Send us an email
                        </button>
                    </div>
                )}
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
                                <Field
                                    name='rating'
                                    type='number'
                                    min='1'
                                    max='5'
                                />
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
                                <Field name='email' type='email' />
                                <Field as='textarea' name='message' />
                                <Field
                                    name='rating'
                                    type='number'
                                    min='1'
                                    max='5'
                                />
                                <div className='button-group'>
                                    <button
                                        type='submit'
                                        disabled={isSubmitting}
                                        className='submit-button'
                                    >
                                        Submit Email
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() =>
                                            handleFormSwitch('initial')
                                        }
                                        className='back-button'
                                    >
                                        Back
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
