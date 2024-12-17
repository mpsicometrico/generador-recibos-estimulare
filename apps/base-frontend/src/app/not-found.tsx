export default function NotFound() {
  return (
    <div className='w-dvw h-dvh flex flex-col justify-center items-center'>
      <h1 className='text-xl'>
        <strong>Página no encontrada.</strong>
      </h1>
      <p className='text-lg'>
        La página que buscas no existe, verifica la URL e intenta de nuevo.
      </p>
    </div>
  )
}
