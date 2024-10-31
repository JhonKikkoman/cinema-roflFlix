import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { singUpFormSchema } from '../../../models/Yup';

const initValue = {
  userName: '',
  email: '',
  password: '',
  confirm: '',
};

export default function Authentication() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:460px)');

  const handleClickShowPassword = () => setShowPassword(prev => !prev);
  const handleClickShowConfirm = () => setConfirm(prev => !prev);

  return (
    <Stack m={4}>
      {isMobile ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            startIcon={<CancelIcon fontSize="large" />}
            onClick={() => navigate('/')}
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} />
          <Typography variant="h6">На главную</Typography>
        </Box>
      )}

      <Box margin="auto">
        <Typography variant="h4" textAlign="center">
          Sing up!
        </Typography>
        <Formik
          initialValues={initValue}
          enableReinitialize
          validationSchema={singUpFormSchema}
          onSubmit={(values: typeof initValue, { resetForm }) => {
            console.log(values); // артефакт
            resetForm({ values: initValue });
            navigate('/');
          }}
        >
          {({ handleSubmit, errors, touched, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack flexDirection="column" alignItems="center">
                <Box
                  width="70%"
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  marginY={2}
                >
                  <TextField
                    id="outlined-basic-username"
                    variant="outlined"
                    label="Username"
                    fullWidth
                    type="text"
                    value={values.userName}
                    name="userName"
                    onChange={({ target }) =>
                      setFieldValue('userName', target.value)
                    }
                    error={touched.userName && Boolean(errors.userName)}
                    helperText={touched.userName && errors.userName}
                  />
                  <TextField
                    id="outlined-basic-email"
                    variant="outlined"
                    label="Email"
                    type="email"
                    fullWidth
                    value={values.email}
                    name="email"
                    onChange={({ target }) =>
                      setFieldValue('email', target.value)
                    }
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <FormControl variant="outlined">
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onChange={({ target }) =>
                        setFieldValue('password', target.value)
                      }
                      error={touched.password && Boolean(errors.password)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? 'hide' : 'display'}
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <Typography
                      mt={1}
                      variant="caption"
                      color="error"
                      marginX={1}
                    >
                      {touched.password && errors.password}
                    </Typography>
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel>ConfirmPassword</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-confirm-password"
                      type={confirm ? 'text' : 'password'}
                      value={values.confirm}
                      name="confirm"
                      onChange={({ target }) =>
                        setFieldValue('confirm', target.value)
                      }
                      error={touched.confirm && Boolean(errors.confirm)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={confirm ? 'hide' : 'display'}
                            onClick={handleClickShowConfirm}
                            edge="end"
                          >
                            {confirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="ConfirmPassword"
                    />
                    <Typography
                      mt={1}
                      variant="caption"
                      color="error"
                      marginX={1}
                    >
                      {touched.confirm && errors.confirm}
                    </Typography>
                  </FormControl>
                </Box>
                <Typography textAlign="center">
                  {`By creating an account you agree to `}
                  <Link href="#" sx={{ textDecoration: 'none' }}>
                    Terms & Condition
                  </Link>
                </Typography>
                <Button type="submit" variant="contained" sx={{ mt: 1, mb: 1 }}>
                  Create account
                </Button>
                <Typography textAlign="center">
                  {`Already have an account? `}
                  <Link href="#" sx={{ textDecoration: 'none' }}>
                    Login
                  </Link>
                </Typography>
                <Typography>
                  {`Need help ? `}
                  <Link href="#" sx={{ textDecoration: 'none' }}>
                    Contact Us
                  </Link>
                </Typography>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  );
}
