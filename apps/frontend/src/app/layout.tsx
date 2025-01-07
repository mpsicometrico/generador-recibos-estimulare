import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'sonner'
import { NavigationButtons } from '@components/navigation-buttons'
import AuthProvider from '@providers/AuthProvider'

const interVariable = localFont({
  src: './fonts/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter-variable',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Generador de Facturas Electrónicas - Estimulare',
  description: 'Generador de facturas electrónicas.'
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
          <NavigationButtons />
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
