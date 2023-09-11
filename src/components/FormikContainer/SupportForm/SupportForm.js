import { Box, Button, Grid, IconButton, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
const SupportForm = () => {
    const [loading, setLoading] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [showError, setShowError] = useState(false);
    const [supportError, setSupportError] = useState('');
    const initialValue = {
        name: '',
        email: '',
        description: '',
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('E-mail is not valid').required('Required'),
        description: Yup.string().required('Required!'),
    });
    const handleSubmit = async (values, onSubmitProps) => {
        const { name, email, description } = values;
        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:3001/api/support/newsupport',
                {
                    name,
                    email,
                    description,
                }
            );
            if (response.status === 200) {
                setShowSnackBar(true);
                onSubmitProps.resetForm();
            }
        } catch (err) {
            const errorMsg = err.response.data.message;
            setSupportError(errorMsg);
            setShowError(true);
        }
        setLoading(false);
    };
    const closeSnackBar = () => {
        setShowSnackBar(false);
        setShowError(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={closeSnackBar}
                autoHideDuration={4000}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <Snackbar
                action={action}
                open={showSnackBar}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message='Support Query Successfully Submitted'
            />
            <Snackbar
                action={action}
                open={showError}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message={supportError}
            />
            <Grid container>
                <Grid item sm={3} xs={false}></Grid>
                <Grid item sm={6} xs={12}>
                    <Paper>
                        <Box m={5} p={3}>
                            <Formik
                                initialValues={initialValue}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    handleChange,
                                    handleBlur,
                                    touched,
                                    errors,
                                }) => {
                                    const { name, email } = values;
                                    return (
                                        <Form>
                                            <TextField
                                                label='Name'
                                                name='name'
                                                fullWidth
                                                variant='outlined'
                                                margin='dense'
                                                value={name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    <ErrorMessage name='name' />
                                                }
                                                error={
                                                    errors.name && touched.name
                                                }
                                                required
                                            />
                                            <TextField
                                                label='E-mail'
                                                name='email'
                                                fullWidth
                                                variant='outlined'
                                                margin='dense'
                                                value={email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    <ErrorMessage name='email' />
                                                }
                                                error={
                                                    errors.email &&
                                                    touched.email
                                                }
                                                required
                                            />
                                            <Field
                                                as={TextField}
                                                label='How can we help?'
                                                type='text'
                                                name='description'
                                                fullWidth
                                                multiline
                                                margin='dense'
                                                variant='outlined'
                                                InputProps={{
                                                    inputComponent: 'textarea',
                                                    rows: 10,
                                                }}
                                                helperText={
                                                    <ErrorMessage name='description' />
                                                }
                                                error={
                                                    errors.description &&
                                                    touched.description
                                                }
                                            />
                                            <Button
                                                variant='contained'
                                                type='submit'
                                                color='primary'
                                                fullWidth
                                                disabled={loading}
                                            >
                                                {loading && (
                                                    <CircularProgress
                                                        size={15}
                                                        sx={{ mr: '10px' }}
                                                        color='inherit'
                                                    />
                                                )}
                                                Submit
                                            </Button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item sm={3} xs={false}></Grid>
            </Grid>
        </>
    );
};

export default SupportForm;
