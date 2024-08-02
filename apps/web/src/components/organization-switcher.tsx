import { ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'

import { getCurrentOrg } from '@/auth/auth'
import { getOrganizations } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function OrganizationSwitcher() {
  const currentOrg = getCurrentOrg()
  const { organizations } = await getOrganizations()

  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrg,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded-sm text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrganization ? (
          <>
            <Avatar className="size-6">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate">{currentOrganization.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        {organizations.length > 0 && (
          <>
            <DropdownMenuGroup className="grid gap-2">
              <DropdownMenuLabel>Organizations</DropdownMenuLabel>
              {organizations.map((organization) => {
                return (
                  <DropdownMenuItem key={organization.id} asChild>
                    <Link
                      href={`/org/${organization.slug}`}
                      className="flex items-center"
                    >
                      <Avatar className="mr-2 size-6">
                        {organization.avatarUrl && (
                          <AvatarImage src={organization.avatarUrl} />
                        )}
                        <AvatarFallback />
                      </Avatar>
                      <div className="grid">
                        <span className="line-clamp-1 text-sm font-medium">
                          {organization.name}
                        </span>
                        <span className="line-clamp-1 text-xs text-muted-foreground">
                          {organization.slug.toLocaleLowerCase()}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href="/create-organization">
            <Plus className="mr-2 size-5" />

            <span className="text-sm font-medium">Create organization</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
