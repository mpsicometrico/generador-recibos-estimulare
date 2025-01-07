'use client'

import { InputProps } from '@type/components/input'

export default function Checkbox({
  id,
  label,
  className,
  props
}: InputProps): React.ReactElement {
  return (
    <div className='flex flex-row-reverse'>
      <label
        className='cursor-pointer flex flex-row-reverse gap-2'
        htmlFor={id}
      >
        {label}
        <input
          className={`border-solid border-2 border-black rounded-md px-2 py-0.5 ${className}`}
          id={id}
          type='checkbox'
          name={id}
          {...props}
        />
      </label>
    </div>
  )
}
