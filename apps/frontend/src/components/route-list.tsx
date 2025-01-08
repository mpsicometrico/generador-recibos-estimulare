import { RouteListProps } from '@type/components/route-list'
import Link from 'next/link'

export default function RouteList({
  routes,
  className,
  linkClassName
}: RouteListProps) {
  return (
    <ul className={`flex gap-4 list-none ${className}`}>
      {routes.map(({ name, path }) => (
        <li key={path}>
          <Link
            className={`hover:transition ease-in-out delay-[50ms] hover:text-pink ${linkClassName}`}
            href={path}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
