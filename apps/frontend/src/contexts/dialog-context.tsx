import { DialogState } from '@type/contexts/dialog'
import { createContext } from 'react'

export const DialogContext = createContext<DialogState | undefined>(undefined)
