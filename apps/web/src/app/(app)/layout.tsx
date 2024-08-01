export default function AppLayout({
  children,
  header,
}: {
  children: React.ReactNode
  header: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {header}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto w-full max-w-screen-2xl">{children}</div>
      </main>
    </div>
  )
}
