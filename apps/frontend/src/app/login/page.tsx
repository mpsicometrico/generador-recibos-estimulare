'use client'

import { Form, Input, Checkbox } from '@components/index'
import { login } from '@actions/login/login'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const { data: session, status } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      replace('/registrar')
    }
  }, [status, replace])

  if (status === 'loading') return null

  if (status === 'unauthenticated')
    return (
      <section className='max-w-[100dvw] max-h-[100dvh] h-dvh flex justify-center items-center'>
        <div className='w-[90%] h-1/2 flex items-center shadow-xl bg-light-yellow'>
          <section className='w-1/2 h-fit p-[50px]'>
            <h2 className='text-2xl mb-[30px]'>Inicia sesión</h2>
            <Form hasSubmit action={login}>
              <Input id='email' label='Correo electrónico' />
              <Input
                id='password'
                label='Contraseña'
                props={{ type: 'password' }}
              />
              <Checkbox id='remember_user' label='Recuérdame' />
              <button className='w-full p-2 border-solid rounded-xl border-yellow bg-pink text-white'>
                Iniciar sesión
              </button>
            </Form>
          </section>
          <section className='w-1/2 h-full flex flex-col justify-center items-center content-center bg-pink gap-1 text-white'>
            <h2 className='text-2xl mb-[30px] '>Bienvenido a Estimulare.</h2>
            <p>¿No tienes una cuenta?</p>
            <p>Contacta a un administrador.</p>
          </section>
        </div>
      </section>
    )
}

export default Login
