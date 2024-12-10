'use client'

import { useFormik } from 'formik'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import {
  signIn
  // useSession
} from 'next-auth/react'
import {
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Box,
  Grid
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { loginValidationSchema } from '@utils/index'

const initialValues = {
  email: 'Johndoe@gmail.com',
  password: 'test1234'
}

const Login = () => {
  const theme = useTheme()
  // const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        const formData = new FormData()

        Object.keys(initialValues).forEach((k) => {
          formData.append(k, values[k as keyof typeof values])
        })

        try {
          await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
          })
        } catch (error) {
          console.error(`An error occurred: ${error}`)
        } finally {
          resetForm()
        }
      }
    })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <form id='login' onSubmit={handleSubmit}>
        <Grid spacing={2} container maxWidth={500}>
          <Grid item xs={12}>
            <Typography variant='h3' color='prymary' alignSelf={'center'}>
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='login-email'
              variant='outlined'
              label='Correo electrónico'
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='login-password'
              variant='outlined'
              label='Contraseña'
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color='primary'
              variant='contained'
              type='submit'
              fullWidth
              sx={{
                color: theme.palette.background.default,
                fontWeight: 'bold'
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} justifyContent='center'>
            <Typography variant='body1' color='textPrimary'>
              Don&apos;t have an account yet?{' '}
              <Link
                href='/register'
                style={{ color: theme.palette.primary.main }}
              >
                Register
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default Login
