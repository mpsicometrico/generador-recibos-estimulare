'use client'

import { InputProps } from '@type/components/input'

export default function Input({
  id,
  label,
  className,
  labelStyle,
  placeholder,
  props
}: InputProps): React.ReactElement {
  return (
    <div className='flex flex-col'>
      <label className={`cursor-pointer ${labelStyle}`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`border-solid border-2 border-black rounded-md px-2 py-0.5 ${className}`}
        id={id}
        name={id}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}
