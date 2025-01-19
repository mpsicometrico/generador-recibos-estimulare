'use client'

import { useActionState } from 'react'
import { FormProps } from '@type/components/form'

export default function Form({
  action,
  hasSubmit = false,
  children
}: FormProps): React.ReactElement {
  const [state, formAction, isPending] = useActionState(action, undefined)

  console.log(state)
  return (
    <form action={formAction} className='flex flex-col gap-5'>
      {children}

      {!hasSubmit && (
        <button
          type='submit'
          disabled={isPending}
          className='border-solid border-2 border-black rounded-md mt-10'
        >
          {isPending ? 'Cargando...' : 'Registrar'}
        </button>
      )}
    </form>
  )
}
