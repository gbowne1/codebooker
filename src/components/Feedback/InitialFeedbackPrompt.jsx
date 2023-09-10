import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Rating } from 'react-simple-star-rating';
import toast, { Toaster } from 'react-hot-toast';
import './Feedback.css';
import axios from 'axios';

// Bind modal to app
Modal.setAppElement('#root');

// Validate direct feedback
const feedbackValidationSchema = Yup.object().shape({
    feedback: Yup.string()
        .trim()
        .required('Feedback is required')
        .max(2000, 'Feedback should not exceed 2000 characters'),
    rating: Yup.number()
        .required('Rating is required')
        .min(0, 'Rating should be at least 0')
        .max(5, 'Rating should not exceed 5'),
});

export function CaptureFeedback({ isActive, onClose }) {
    const [formToShow, setFormToShow] = useState('initial'); // State for which form to render
    const [rating, setRating] = useState(0); // State for feedback rating

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
        <>
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
                        We appreciate your feedback. <br></br> Please let us
                        know how we can improve.
                    </h2>
                    {/* INITIAL FORM */}
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
                    {/* DIRECT FEEDBACK FORM */}
                    {formToShow === 'feedback' && (
                        <Formik
                            initialValues={{ feedback: '', rating: rating }}
                            validationSchema={feedbackValidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                //Get token and user info
                                const token = localStorage.getItem('token');
                                const user = JSON.parse(
                                    localStorage.getItem('user')
                                );

                                if (token && user) {
                                    // User logged in and user details are available
                                    const userId = user._id;
                                    axios
                                        .post(
                                            'http://localhost:3001/api/user/feedback/new',
                                            {
                                                feedback: values.feedback,
                                                rating: values.rating,
                                                author: userId,
                                            },
                                            {
                                                headers: {
                                                    'Content-Type':
                                                        'application/json',
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            }
                                        )
                                        .then((response) => {})
                                        .then(() => {
                                            setSubmitting(false);
                                            onClose();
                                            toast.success(
                                                'Thank you, your feedback has been submitted!'
                                            );
                                        })
                                        .catch((error) => {
                                            console.error(
                                                'There was an error submitting the feedback',
                                                error
                                            );
                                        });
                                } else {
                                    // User is not logged in or user details are not available
                                    console.error(
                                        'User is not authenticated or user details are missing.'
                                    );
                                }
                            }}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <Field
                                        as='textarea'
                                        name='feedback'
                                        disabled={isSubmitting}
                                        className='feedback-textarea'
                                    />
                                    <div className='rating-container'>
                                        <div className='rating-container'>
                                            <Rating
                                                disabled={isSubmitting}
                                                onClick={(value) => {
                                                    setRating(value);
                                                    setFieldValue(
                                                        'rating',
                                                        value
                                                    );
                                                }}
                                                onPointerMove={onPointerMove}
                                                initialValue={rating}
                                            />
                                        </div>
                                    </div>
                                    <div className='button-group'>
                                        <button
                                            type='button'
                                            disabled={isSubmitting}
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
                            initialValues={{
                                email: '',
                                feedback: '',
                                rating: '',
                            }}
                            validationSchema={feedbackValidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                const token = localStorage.getItem('token');
                                const user = JSON.parse(
                                    localStorage.getItem('user')
                                );
                                const userId = user._id;
                                const userEmail = user.email;
                                const username = user.username;

                                if (token && user) {
                                    // User logged in and user details are available
                                    axios
                                        .post(
                                            'http://localhost:3001/api/user/feedback/mail',
                                            {
                                                feedback: values.feedback,
                                                rating: values.rating,
                                                userId: userId,
                                                userEmail: userEmail,
                                                username: username,
                                            },
                                            {
                                                headers: {
                                                    'Content-Type':
                                                        'application/json',
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            }
                                        )
                                        .then((response) => {})
                                        .then(() => {
                                            setSubmitting(false);
                                            onClose();
                                            toast.success(
                                                'Thank you, your feedback has been submitted!'
                                            );
                                        })
                                        .catch((error) => {
                                            console.error(
                                                'There was an error submitting the feedback',
                                                error
                                            );
                                        });
                                } else {
                                    // User is not logged in or user details are not available
                                    console.error(
                                        'User is not authenticated or user details are missing.'
                                    );
                                }
                            }}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <Field
                                        as='textarea'
                                        name='feedback'
                                        disabled={isSubmitting}
                                        className='feedback-textarea'
                                    />
                                    <div className='rating-container'>
                                        <Rating
                                            disabled={isSubmitting}
                                            onClick={(value) => {
                                                setRating(value);
                                                setFieldValue('rating', value);
                                            }}
                                            onPointerMove={onPointerMove}
                                            initialValue={rating}
                                        />
                                    </div>
                                    <div className='button-group'>
                                        <button
                                            type='button'
                                            disabled={isSubmitting}
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
            <Toaster />
        </>
    );
}

CaptureFeedback.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
