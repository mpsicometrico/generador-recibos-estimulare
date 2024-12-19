import { SelectHTMLAttributes } from 'react'

import { InputProps } from './input'
import { Entities } from '../../constants/entities'

export interface SelectProps extends Omit<InputProps, 'placeholder'> {
  entity: Entities
  props?: SelectHTMLAttributes<HTMLSelectElement>
}

export interface Option {
  id: number
  label: string
}
