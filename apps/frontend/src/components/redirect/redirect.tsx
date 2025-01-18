'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import { protectedRoutes } from '@constants/routing'

interface Props {
  children: React.ReactNode
}

export default function Redirect({ children }: Props) {
  const pathname = usePathname()
  const { status } = useSession()

  const isProtected = protectedRoutes.includes(pathname)

  return (
    <section className={`p-4 h-full`}>
      {isProtected && status === 'unauthenticated' ? (
        <div className='items-center justify-center h-full gap-4'>
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
