import dynamic from 'next/dynamic'
import { Entities } from './entities'
import { ComponentType } from 'react'

const forms: Record<Entities, ComponentType> = {
  [Entities.Patient]: dynamic(() => import('@components/forms/patient')),
  [Entities.Invoice]: dynamic(() => import('@components/forms/invoice')),
  [Entities.Psychologist]: dynamic(
    () => import('@components/forms/psychologist')
  ),
  [Entities.User]: dynamic(() => import('@components/forms/user'))
}

export default forms
