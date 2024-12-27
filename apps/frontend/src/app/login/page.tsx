'use client'

import { Form, Input } from '@components/index'
import { login } from '@actions/login/login'

const Login = () => {
  return (
    <section className='max-w-[100dvw] max-h-[100dvh] h-dvh flex justify-center items-center'>
      <div className='w-[90%] h-1/2 bg-red content-center flex'>
        <section className='w-1/2 h-full'>
          <Form hasSubmit action={login}>
            <Input id='email' label='Correo electrónico' />
            <Input
              id='password'
              label='Contraseña'
              props={{ type: 'password' }}
            />
            <button>Iniciar sesión</button>
          </Form>
        </section>
        <article className='w-1/2 h-full content-center'>LOGO</article>
      </div>
    </section>
  )
}

export default Login
