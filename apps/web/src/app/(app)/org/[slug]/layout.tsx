import { getCurrentOrg } from '@/auth/auth'
import OrganizationTabsNavigation from '@/components/organization-tabs-navigation'
import { getOrganizations } from '@/http/get-organizations'

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentOrg = getCurrentOrg()
  const { organizations } = await getOrganizations()

  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrg,
  )

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full gap-2">
        <h1 className="text-3xl font-semibold">{currentOrganization!.name}</h1>
      </div>
      <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
        <OrganizationTabsNavigation />
        {children}
      </div>
    </main>
  )
}
