import { toast } from 'sonner'
import { getSession, signIn } from 'next-auth/react'

export async function login(_previousState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData)

  const { email, password } = data

  if (!email || !password) {
    toast.error(
      'El correo electrónico y la contraseña son campos obligatorios.'
    )
    return
  }

  toast.promise(
    signIn('credentials', {
      email,
      password,
      redirect: false
    }),
    {
      loading: 'Cargando...',
      success: async () => {
        const session = await getSession()
        const { name, lastName } = session!.user

        return `Bienvenido, ${name} ${lastName}.`
      },
      error: () => `Credenciales inválidas.`
    }
  )
}
