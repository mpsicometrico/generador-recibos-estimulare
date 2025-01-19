'use client'

import { ListView } from '@components/index'
import { Entities } from '@constants/entities'

export default function PatientHome() {
  return <ListView entity={Entities.Patient} />
}
