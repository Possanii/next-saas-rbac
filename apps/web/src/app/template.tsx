import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'

export default function AppTemplate({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userAuthenticated = isAuthenticated()

  if (!userAuthenticated) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {children}
      </main>
    </div>
  )
}
