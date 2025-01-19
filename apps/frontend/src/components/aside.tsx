import { IconPlusSquare } from '@components/icons/add'
import { useDialog } from '@hooks/use-dialog'

export default function Aside({ canCreate }: { canCreate: boolean }) {
  const { handleState } = useDialog()

  return (
    <aside className='w-[15%] shadow-lg p-4 rounded-xl'>
      {canCreate && (
        <button
          className='w-full flex justify-evenly items-center border-2 border-black p-2 rounded-lg'
          onClick={() => handleState(true)}
        >
          <span>Crear</span>
          <IconPlusSquare />
        </button>
      )}
    </aside>
  )
}
