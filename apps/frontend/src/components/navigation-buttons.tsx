'use client'

import { BASE_URL } from '../constants/routing'
import { IconBackArrow } from './icon'
import { usePathname, useRouter } from 'next/navigation'

export function NavigationButtons() {
  const { back, forward } = useRouter()
  const pathname = usePathname()

  const isDisabled = pathname === BASE_URL
  const baseClass = `absolute top-4`

  return (
    <>
      <button
        className={`${baseClass} left-4 ${isDisabled ? 'cursor-not-allowed' : ''}`}
        onClick={() => back()}
        disabled={isDisabled}
      >
        <IconBackArrow
          props={{
            height: '2rem',
            width: '2rem',
            fill: isDisabled ? '#bdbcbc' : '#171717'
          }}
        />
      </button>
      <button
        className={`${baseClass} right-4 scale-x-[-1]`}
        onClick={() => forward()}
      >
        <IconBackArrow
          props={{
            height: '2rem',
            width: '2rem'
          }}
        />
      </button>
    </>
  )
}
