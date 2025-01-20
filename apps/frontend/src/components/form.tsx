'use client'

import { useActionState, useEffect } from 'react'
import { FormProps } from '@type/components/form'
import { useDialog } from '@hooks/use-dialog'

export default function Form({
  action,
  hasSubmit = false,
  children
}: FormProps): React.ReactElement {
  const { isOpen, handleState } = useDialog()
  const [state, formAction, isPending] = useActionState(action, undefined)

  useEffect(() => {
    if (typeof state === 'string' && state === 'success' && isOpen) {
      handleState(false)
    }
  }, [state, handleState, isOpen])

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
