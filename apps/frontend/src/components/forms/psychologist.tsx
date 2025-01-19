import { Form } from '@components/index'
import { Input } from '@components/fields'
import { registerPsychologist } from '@actions/psychologist/register'

export default function PsychologistForm() {
  return (
    <Form action={registerPsychologist}>
      <Input id='name' label='Nombre de la psicóloga / psicólogo *' />
      <Input id='lastName' label='Apellidos *' />
      <Input id='email' label='Correo electrónico' />
    </Form>
  )
}
