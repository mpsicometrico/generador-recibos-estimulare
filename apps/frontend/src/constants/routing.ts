import { Route } from '@type/constants/route'

export const protectedRoutes = [
  '/registrar',
  '/registrar/paciente',
  '/registrar/recibo',
  '/registrar/terapeuta'
]

export const hideNavbarRoutes = ['/login']

export const navigationRoutes: Route[] = [
  { name: 'Pacientes', path: '/pacientes' },
  { name: 'Recibos', path: '/recibos' },
  { name: 'Psicólogas / Psicólogos', path: '/terapeutas' }
]
