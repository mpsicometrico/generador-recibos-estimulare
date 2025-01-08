import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          }
        )

        if (!res.ok) {
          throw new Error('Credenciales inválidas')
        }

        const data = await res.json()
        return data
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user !== undefined) {
        token = user as unknown as JWT
      }
      return token
    },
    async session({ session, token }) {
      const dto = {
        ...token
      }
      session = dto
      return session
    }
  }
})

export { handler as GET, handler as POST }
