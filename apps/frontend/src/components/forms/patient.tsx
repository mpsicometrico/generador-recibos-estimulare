import { Form } from '@components/index'
import { Input, Select } from '@components/fields'
import { registerPatient } from '@actions/patient/register'
import { Entities } from '@constants/entities'

export default function PatientForm() {
  return (
    <Form action={registerPatient}>
      <Input id='name' label='Nombre del paciente *' />
      <Input id='father' label='Nombre de papá' />
      <Input id='mother' label='Nombre de mamá' />
      <Input id='school' label='Nombre de la escuela' />
      <Select
        id='psychologistId'
        label='Psicóloga / psicólogo *'
        entity={Entities.Psychologist}
      />
    </Form>
  )
}
