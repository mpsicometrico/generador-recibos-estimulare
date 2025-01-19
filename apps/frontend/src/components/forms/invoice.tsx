import { useState } from 'react'
import { toast } from 'sonner'

import { Form } from '@components/index'
import { Input, Select } from '@components/fields'
import { Entities } from '@constants/entities'
import { registerInvoice } from '@actions/invoice/register'
import { patientService } from '@services/index'

export default function InvoiceForm() {
  const [, setDebt] = useState<number | null>(null)

  const getDebt = async (id: number) => {
    try {
      const result = await patientService.getDebt(id)

      setDebt(result.data)
    } catch (e) {
      toast.error(
        `Ocurrió un error al obtener el adeudo del paciente, intente de nuevo más tarde. ${e}`
      )
    }
  }

  return (
    <Form action={registerInvoice}>
      <Select
        id='patientId'
        label='Paciente'
        entity={Entities.Patient}
        props={{
          onChange: async (e) => {
            const value = Number(e.target.value)

            if (value === 0) return

            await getDebt(value)
          }
        }}
      />
      <Input id='type' label='Tipo de terapia' />
      <Input id='price' label='Total' />
      <Input id='paid' label='Pago' />
    </Form>
  )
}
