import { Search, Slash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { ability } from '@/auth/auth'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { Input } from './ui/input'

export async function Header() {
  const permissions = await ability()

  return (
    <header className="sticky top-0 w-full border-b bg-background">
      <div className="w-100 m-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src={githubIcon}
              className="h-6 w-6 dark:invert"
              alt="Github Logo"
            />
          </Link>
          <Slash className="size-3 -rotate-[24deg] text-border dark:invert" />
          <OrganizationSwitcher />

          {permissions?.can('get', 'Project') && <p>Projetos</p>}
        </div>
        <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
          <form className="hidden flex-1 sm:flex-initial md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>

          <ProfileButton />
        </div>
      </div>
    </header>
  )
}
