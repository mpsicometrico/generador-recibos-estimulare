import { toast } from 'sonner'
import { PsychologistService } from '@services/psychologist.service'

const psychologistService = new PsychologistService()

export async function registerPsychologist(
  _previousState: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData)

  if (Object.values(data).some((value) => !value)) {
    toast.error('Por favor, llena todos los campos')
    return
  }

  toast.promise(psychologistService.register(data), {
    loading: 'Registrando terapeuta...',
    success: (data) => {
      const { name, lastName } = data.data
      return `El terapeuta ${name} ${lastName} ha sido registrado correctamente.`
    },
    error: (e) => `Ocurrió un error al registrar al terapeuta: ${e}`
  })
}
