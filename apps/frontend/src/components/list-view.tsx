import { ListViewProps } from '@type/components/list-view'
import Aside from '@components/aside'

export default function ListView({ canCreate = true }: ListViewProps) {
  return (
    <div className='`w-full h-full flex justify-around pt-4 pb-4'>
      <Aside canCreate={canCreate} />
      <section className='w-[75%] shadow-lg p-4 rounded-xl bg-light-yellow'>
        LIST
      </section>
    </div>
  )
}
