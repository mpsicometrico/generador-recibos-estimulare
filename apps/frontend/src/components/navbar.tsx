'use client'

import { NavigationButtons } from './navigation-buttons'
import { hideNavbarRoutes, navigationRoutes } from '@constants/routing'
import RouteList from '@components/route-list'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const { status } = useSession()

  if (hideNavbarRoutes.includes(pathname)) return null

  return (
    <section className='w-full h-[120px] border-b-[1px] border-solid border-black'>
      <nav className='flex justify-between h-[56px] shadow-sm p-4'>
        <RouteList routes={navigationRoutes} />
        {status === 'authenticated' && (
          <button
            className='hover:transition ease-in-out delay-[50ms] hover:text-pink'
            onClick={async () => {
              await signOut({ redirect: false })
              replace('/login')
            }}
          >
            Cerrar sesión
          </button>
        )}
        {status === 'unauthenticated' && (
          <Link href={'/login'}>Iniciar sesión</Link>
        )}
      </nav>
      <NavigationButtons />
    </section>
  )
}
