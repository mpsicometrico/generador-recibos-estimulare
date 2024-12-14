import { toast } from 'sonner'
import { register } from '@services/patient.service'

export async function registerPatient(
  _previousState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData)

  if (Object.values(data).some((value) => !value)) {
    toast.error('Por favor, llena todos los campos')
    return
  }

  toast.promise(register(data), {
    loading: 'Registrando paciente...',
    success: (data) =>
      `El paciente ${data.data.name} ha sido registrado correctamente.`,
    error: (e) =>
      `Ocurrió un error al registrar al paciente: ${e.response?.data.message.join(', ')}`
  })
}
