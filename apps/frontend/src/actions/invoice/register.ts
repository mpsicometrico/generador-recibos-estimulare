import { toast } from 'sonner'
import { invoiceService } from '@services/index'

export async function registerInvoice(
  _previousState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData)

  if (Object.values(data).some((value) => !value)) {
    toast.error('Por favor, llena todos los campos')
    return
  }

  if (data.patientId === '0') {
    toast.error('Selecciona un paciente.')
    return
  }

  const payload = {
    ...data,
    patientId: Number(data.patientId)
  }

  toast
    .promise(invoiceService.register(payload), {
      loading: 'Registrando recibo...',
      success: (data) => {
        const { id } = data.data
        return `El recibo ${id} ha sido registrado correctamente.`
      },
      error: (e) =>
        `Ocurrió un error al registrar el recibo: ${e.response?.data.message.join(', ')}`
    })
    .unwrap()
    .then(() => 'success')
    .catch(() => 'error')
}
