'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { RouteListProps } from '@type/components/route-list'

export default function RouteList({
  routes,
  className,
  linkClassName
}: RouteListProps) {
  const pathname = usePathname()

  return (
    <ul className={`flex gap-4 list-none ${className}`}>
      {routes.map(({ name, path }) => (
        <li key={path}>
          <Link
            className={`hover:transition ease-in-out delay-[50ms] hover:text-pink ${pathname === path && 'text-pink'} ${linkClassName}`}
            href={path}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
