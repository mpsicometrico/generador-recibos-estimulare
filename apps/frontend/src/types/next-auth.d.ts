import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface User {
    id: number
    name: string
    lastName: string
    email: string
  }

  interface Session {
    token: string
    // exp: number;
    // expires: string;
    // expires_in: number;
    // iat: number;
    // jti: string;
    // token_type: string;
    user: User
  }
}

declare module 'next-auth/jwt' {
  type JWT = {
    token: string
    expires: string
    exp: number
    iat: number
    jti: string
    user: User
  }
}
