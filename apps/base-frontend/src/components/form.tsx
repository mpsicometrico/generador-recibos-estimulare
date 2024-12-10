'use client'

import { useActionState } from 'react'

import { Input } from '@components/index'
import { registerPatient } from '@actions/registerPatient'

export default function Form(): React.ReactElement {
  const [data, action, isPending] = useActionState(registerPatient, undefined)

  console.log({ data })

  return (
    <form action={action} className='flex flex-col gap-5'>
      <Input id='patient' label='Nombre del paciente' />
      <Input id='father' label='Nombre de papá' />
      <Input id='mother' label='Nombre de mamá' />
      <Input id='school' label='Nombre de la escuela' />
      <Input id='psychologist' label='Nombre de psicóloga' />
      <button
        className='border-solid border-2 border-black rounded-md mt-2'
        disabled={isPending}
      >
        Registrar
      </button>
    </form>
  )
}
