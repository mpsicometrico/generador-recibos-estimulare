'use client'

import type { JSX } from 'react'

interface Props {
  children: React.ReactNode
}

export default function LoadingProvider({ children }: Props) {
  return <div>{children}</div>
}
