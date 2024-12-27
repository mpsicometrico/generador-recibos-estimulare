'use client'

import { registerInvoice } from '@actions/invoice/register'
import { Form, Input } from '@components/index'
import Select from '@components/select'
import { Entities } from '../../../constants/entities'
import { useState } from 'react'
import { patientService } from '@services/index'
import { toast } from 'sonner'

export default function InvoiceForm() {
  const [debt,setDebt] = useState<number | null>(null)

  const getDebt = async (id: number) => {
    try{
      const result = await patientService.getDebt(id)

      setDebt(result.data)
    }catch(e){
      toast.error('Ocurrió un error al obtener el adeudo del paciente, intente de nuevo más tarde.')
    }
  }
  
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Form action={registerInvoice}>
          <Select id='patientId' label='Paciente' entity={Entities.Patient} props={{onChange: (async (e) => {
            const value = Number(e.target.value)

            if(value === 0) return

            await getDebt(value)
          })}}/>
          <Input id='type' label='Tipo de terapia' />
          <Input id='price' label='Total' />
          <Input id='paid' label='Pago' />
        </Form>
      </main>
    </div>
  )
}
