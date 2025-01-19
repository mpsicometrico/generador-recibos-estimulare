'use client'

import { ListView } from '@components/index'
import { Entities } from '@constants/entities'

export default function PsychologistForm() {
  return <ListView entity={Entities.Psychologist} />
}
