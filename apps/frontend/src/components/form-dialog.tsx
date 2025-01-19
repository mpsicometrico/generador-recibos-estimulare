import { MouseEvent, useEffect, useMemo, useRef } from 'react'

import { FormDialogProps } from '@type/components/form-dialog'
import forms from '@constants/import-forms'
import { useDialog } from '@hooks/use-dialog'

export default function FormDialog({ entity }: FormDialogProps) {
  const { isOpen, handleState } = useDialog()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const closeDialog = () => {
    handleState(false)
  }

  const isOutsideDialog = (
    e: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>
  ) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    const isInDialog =
      rect &&
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom

    if (!isInDialog) {
      closeDialog()
    }
  }

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal()
      } else {
        dialogRef.current.close()
      }
    }
  }, [isOpen])

  const ListForm = useMemo(() => {
    return forms[entity as keyof typeof forms]
  }, [entity])

  return (
    <div className={`absolute inset-0 ${isOpen ? 'flex' : 'hidden'}`}>
      <dialog
        className='w-2/3 min-h-[33%] flex flex-col justify-self-center self-center rounded-xl p-4'
        ref={dialogRef}
        onClose={closeDialog}
        onClick={isOutsideDialog}
      >
        <button className='w-[30px] self-end' onClick={closeDialog}>
          X
        </button>
        <ListForm />
      </dialog>
    </div>
  )
}
