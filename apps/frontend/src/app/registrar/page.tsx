import Link from 'next/link'

const baseUrl = '/registrar'

export default function RegisterHome() {
  return (
    <section className='flex flex-col w-dvw h-dvh justify-center items-center gap-8'>
      <h2 className='text-3xl'>
        <strong>Registros</strong>
      </h2>
      <nav>
        <ul className='flex gap-4 font-extrabold text-lg flex-col list-disc'>
          <li>
            <Link href={`${baseUrl}/paciente`}>Paciente</Link>
          </li>
          <li>
            <Link href={`${baseUrl}/recibo`}>Recibo</Link>
          </li>
          <li>
            <Link href={`${baseUrl}/terapeuta`}>Psicóloga / Psicólogo</Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}
