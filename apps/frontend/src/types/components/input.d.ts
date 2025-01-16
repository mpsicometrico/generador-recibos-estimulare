import { InputHTMLAttributes } from 'react'

export interface InputProps {
  id: string
  label: string
  className?: string
  labelStyle?: string
  placeholder?: string
  props?: InputHTMLAttributes<HTMLInputElement>
}
