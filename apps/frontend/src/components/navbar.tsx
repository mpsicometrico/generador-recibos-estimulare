'use client'

import { NavigationButtons } from './navigation-buttons'
import { hideNavbarRoutes, navigationRoutes } from '@constants/routing'
import RouteList from '@components/route-list'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  if (hideNavbarRoutes.includes(pathname)) return null

  return (
    <section className='w-full h-[56px] shadow-sm p-4 absolute'>
      <nav>
        <RouteList routes={navigationRoutes} />
      </nav>
      <NavigationButtons />
    </section>
  )
}
