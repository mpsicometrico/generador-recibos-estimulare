'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import { hideNavbarRoutes, protectedRoutes } from '@constants/routing'

interface Props {
  children: React.ReactNode
}

export default function RedirectProvider({ children }: Props) {
  const pathname = usePathname()
  const { status } = useSession()

  const isProtected = protectedRoutes.includes(pathname)
  const hideNavbar = hideNavbarRoutes.includes(pathname)

  return (
    <section
      className={`w-full ${hideNavbar ? 'h-dvh' : 'h-main-content'} absolute bottom-0 p-4`}
    >
      {isProtected && status === 'unauthenticated' ? (
        <div className='flex flex-col items-center justify-center h-full gap-4'>
          <h2>Sin acceso</h2>
          <p>No estás autorizado a ver esta página.</p>
          <Link href='/login'>
            <strong>Inicia sesion</strong>
          </Link>
        </div>
      ) : (
        children
      )}
    </section>
  )
}
