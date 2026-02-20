import './globals.css'
import { Inter } from 'next/font/google'
import { ConvexClientProvider } from '../components/ConvexClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Task Board',
  description: '24小时AI任务管理系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  )
}