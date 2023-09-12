import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Rating } from 'react-simple-star-rating';
import * as Yup from 'yup';
import axios from 'axios';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import './Feedback.css';

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

export default function DirectFeedback({
    handleFormSwitch,
    rating,
    onPointerMove,
    setRating,
    onClose,
}) {
    return (
        <React.Fragment>
            <Formik
                initialValues={{ feedback: '', rating: rating }}
                validationSchema={feedbackValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    //Get token and user info
                    const token = localStorage.getItem('token');
                    const user = JSON.parse(localStorage.getItem('user'));

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
                                        'Content-Type': 'application/json',
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
                                        setFieldValue('rating', value);
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
                                    handleFormSwitch('initialPrompt')
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
            <Toaster />
        </React.Fragment>
    );
}

DirectFeedback.propTypes = {
    handleFormSwitch: PropTypes.func.isRequired,
    rating: PropTypes.number.isRequired,
    onPointerMove: PropTypes.func.isRequired,
    setRating: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
