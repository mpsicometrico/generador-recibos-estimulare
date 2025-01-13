import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'

import AuthProvider from '@providers/AuthProvider'
import LoadingProvider from '@providers/LoadingProvider'
import Redirect from '@components/redirect/redirect'
import Navbar from '@components/navbar'
import './globals.css'

const interVariable = localFont({
  src: '../fonts/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter-variable',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Generador de Recibos Electrónicos - Estimulare',
  description: 'Generador de Recibos electrónicos.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body
        className={`${interVariable.className} antialiased relative max-w-[100dvw] max-h-[100dvh] overflow-hidden`}
      >
        <AuthProvider>
          <LoadingProvider>
            <Toaster richColors />
            <Navbar />
            <Redirect>{children}</Redirect>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
