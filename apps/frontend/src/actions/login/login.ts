import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth'

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
        console.log(await getServerSession())
        return `Bienvenido, ${data}.`
      },
      error: () => `Credenciales inválidas.`
    }
  )
}
