import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'

import AuthProvider from '@providers/AuthProvider'
import LoadingProvider from '@providers/LoadingProvider'
import RedirectProvider from '@providers/RedirectProvider'
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
      <body className={`${interVariable.className} antialiased relative`}>
        <AuthProvider>
          <LoadingProvider>
            <Toaster richColors />
            <Navbar />
            <RedirectProvider>{children}</RedirectProvider>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
