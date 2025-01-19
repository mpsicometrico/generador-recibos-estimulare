import { useContext } from 'react'
import { DialogContext } from '@contexts/dialog-context'

export const useDialog = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }

  const { handleState, isOpen } = context

  return { handleState, isOpen }
}
