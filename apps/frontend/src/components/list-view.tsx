'use client'

import { ListViewProps } from '@type/components/list-view'
import { Aside, FormDialog } from '@components/index'

export default function ListView({ entity, canCreate = true }: ListViewProps) {
  return (
    <div className='`w-full h-full flex justify-around pt-4 pb-4'>
      <Aside canCreate={canCreate} />
      <section className='w-[75%] shadow-lg p-4 rounded-xl'>LIST</section>
      <FormDialog entity={entity} />
    </div>
  )
}
