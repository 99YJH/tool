import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { MainLayout } from '@/components/layout/main-layout'
import { UpdateDialog } from '@/components/update-dialog'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '다기능 오피스 툴킷',
  description: '업무 효율을 높이는 다양한 툴 모음',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
          <UpdateDialog />
        </ThemeProvider>
      </body>
    </html>
  )
}
