import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './CaptureFeedback.css';

// Bind modal to your app
Modal.setAppElement('#root');

const validationSchema = Yup.object({
    feedback: Yup.string().required('Feedback is required'),
});

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
            <h2>
                We appreciate your feedback. <br></br> Please let us know how we
                can improve.
            </h2>
            <Formik
                initialValues={{ feedback: '' }}
                validationSchema={validationSchema}
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
                        <div className='button-group'>
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='submit-button'
                            >
                                Leave us a quick message
                            </button>
                            <button
                                type='button'
                                onClick={onClose}
                                className='email-button'
                            >
                                Or send us an email
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

CaptureFeedback.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
