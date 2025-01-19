'use client'

import React, { useState } from 'react'
import { DialogContext } from '@contexts/dialog-context'

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleState = (opened: boolean) => {
    setIsOpen(opened)
  }

  return (
    <DialogContext.Provider value={{ isOpen, handleState }}>
      {children}
    </DialogContext.Provider>
  )
}
