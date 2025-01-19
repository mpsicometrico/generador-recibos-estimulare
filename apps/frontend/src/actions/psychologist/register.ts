import { toast } from 'sonner'
import { psychologistService } from '@services/index'
import { falsyToNull } from '@utils/functions'

export async function registerPsychologist(
  _previousState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData)

  const { name, lastName } = data

  if (!name || !lastName) {
    toast.error('Por favor, ingresa el nombre y apellidos del terapeuta.')
    return
  }

  const payload = falsyToNull(data)
  let message
  const test = toast.promise(psychologistService.register(payload), {
    loading: 'Registrando terapeuta...',
    success: (data) => {
      const { name, lastName } = data.data
      message = 'success'
      return `El terapeuta ${name} ${lastName} ha sido registrado correctamente.`
    },
    error: (e) => {
      message = 'error'
      return `Ocurrió un error al registrar al terapeuta: ${e.response.data.message}`
    }
  })

  return test
}
