export default function FormDialog({ isOpen }) {
  return (
    <div className='w-dvw h-dvh absolute top-0 z-[-1]'>
      <dialog open={isOpen}></dialog>
    </div>
  )
}
