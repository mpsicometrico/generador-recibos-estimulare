'use client'

import { registerPatient } from '@actions/registerPatient'
import { Form, Input } from '@components/index'

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Form action={registerPatient}>
          <Input id='name' label='Nombre del paciente' />
          <Input id='father' label='Nombre de papá' />
          <Input id='mother' label='Nombre de mamá' />
          <Input id='school' label='Nombre de la escuela' />
        </Form>
      </main>
    </div>
  )
}
