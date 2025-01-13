'use client'

import { IconBackArrow } from './icons/back-arrow'
import { useRouter } from 'next/navigation'

export function NavigationButtons() {
  const { back, forward } = useRouter()
  const baseClass = `absolute top-[72px]`

  return (
    <>
      <button className={`${baseClass} left-4`} onClick={() => back()}>
        <IconBackArrow
          props={{
            height: '2rem',
            width: '2rem'
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
