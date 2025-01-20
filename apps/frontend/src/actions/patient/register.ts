import { toast } from 'sonner'
import { patientService } from '@services/index'
import { falsyToNull } from '@utils/functions'

export async function registerPatient(
  _previousState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData)

  const { name, psychologistId } = data

  if (!name || psychologistId === '0') {
    toast.error(
      'El nombre del paciente y el terapeuta son campos obligatorios.'
    )
    return
  }

  const payload = {
    ...falsyToNull(data),
    psychologistId: Number(psychologistId)
  }

  return toast
    .promise(patientService.register(payload), {
      loading: 'Registrando paciente...',
      success: (data) => {
        const { name } = data.data
        return `El paciente ${name} ha sido registrado correctamente.`
      },
      error: (e) =>
        `Ocurrió un error al registrar al paciente: ${e.response?.data.message.join(', ')}`
    })
    .unwrap()
    .then(() => 'success')
    .catch(() => 'error')
}
