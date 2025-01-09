import { Route } from '@type/constants/route'

export const protectedRoutes = ['/', '/pacientes', '/recibos', '/terapeutas']

export const hideNavbarRoutes = ['/login']

export const navigationRoutes: Route[] = [
  { name: 'Inicio', path: '/' },
  { name: 'Pacientes', path: '/pacientes' },
  { name: 'Recibos', path: '/recibos' },
  { name: 'Psicólogas / Psicólogos', path: '/terapeutas' }
]
