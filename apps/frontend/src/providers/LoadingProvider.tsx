'use client'

import Loader from '@components/loader/loader'
import { useSession } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

export default function LoadingProvider({ children }: Props) {
  const { status } = useSession()

  return (
    <>
      {status === 'loading' ? (
        <div className='flex flex-col items-center justify-center h-dvh gap-4'>
          <h2 className='text-2xl'>Estimulare</h2>
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  )
}
