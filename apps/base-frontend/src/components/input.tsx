'use client'

import { InputProps } from '@/types/components/input'

export default function Input({
  id,
  label,
  className,
  placeholder,
  props
}: InputProps): React.ReactElement {
  return (
    <div className='flex flex-col'>
      <label
        className='cursor-pointer'
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`border-solid border-2 border-black rounded-md ${className}`}
        id={id}
        name={id}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}
