'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { protectedRoutes } from '@constants/routing'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
}

export default function RedirectProvider({ children }: Props) {
  const pathname = usePathname()
  const { status } = useSession()

  const isProtected = protectedRoutes.includes(pathname)

  return (
    <>
      {isProtected && status === 'unauthenticated' ? (
        <div className='flex flex-col items-center justify-center h-dvh gap-4'>
          <h2>Sin acceso</h2>
          <p>No estás autorizado a ver esta página.</p>
          <Link className='font-extrabold' href='/login'>
            Inicia sesion
          </Link>
        </div>
      ) : (
        children
      )}
    </>
  )
}
