export default function Aside({ canCreate }: { canCreate: boolean }) {
  return (
    <aside className='w-[15%] shadow-lg p-4 rounded-xl bg-yellow'>
      {canCreate && <button>Crear</button>}
    </aside>
  )
}
