'use client'

import { ListViewProps } from '@type/components/list-view'
import { Aside, FormDialog } from '@components/index'
import { useState } from 'react'

export default function ListView({ canCreate = true }: ListViewProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='`w-full h-full flex justify-around pt-4 pb-4'>
      <Aside canCreate={canCreate} onCreate={() => setIsOpen(!isOpen)} />
      <section className='w-[75%] shadow-lg p-4 rounded-xl bg-light-yellow'>
        LIST
      </section>
      <FormDialog isOpen={isOpen} />
    </div>
  )
}
