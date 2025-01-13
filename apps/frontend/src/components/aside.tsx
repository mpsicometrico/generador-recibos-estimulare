import { IconPlusSquare } from '@components/icons/add'

export default function Aside({
  canCreate,
  onCreate
}: {
  canCreate: boolean
  onCreate: () => void
}) {
  return (
    <aside className='w-[15%] shadow-lg p-4 rounded-xl bg-yellow'>
      {canCreate && (
        <button
          className='w-full flex justify-evenly items-center border-2 border-pink bg-pink p-2 rounded-lg'
          onClick={onCreate}
        >
          <span>Crear</span>
          <IconPlusSquare />
        </button>
      )}
    </aside>
  )
}
