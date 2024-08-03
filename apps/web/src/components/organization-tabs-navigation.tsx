import { ability, getCurrentOrg } from '@/auth/auth'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

export default async function OrganizationTabsNavigation() {
  const currentOrg = getCurrentOrg()

  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  const canGetMembers = permissions?.can('get', 'User')
  const canGetProjects = permissions?.can('get', 'Project')

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {canGetProjects && (
        <Button
          variant={'ghost'}
          size={'sm'}
          className="justify-start text-muted-foreground/60 data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrg}`}>General</NavLink>
        </Button>
      )}
      {canGetMembers && (
        <Button
          variant={'ghost'}
          size={'sm'}
          className="justify-start text-muted-foreground/60 data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
        </Button>
      )}
      {(canUpdateOrganization || canGetBilling) && (
        <Button
          variant={'ghost'}
          size={'sm'}
          className="justify-start text-muted-foreground/60 data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrg}/settings`}>
            Settings & Billing
          </NavLink>
        </Button>
      )}
    </nav>
  )
}
