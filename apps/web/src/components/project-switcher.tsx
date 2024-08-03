'use client'

import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, Loader2, Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/get-projects'

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
import { Skeleton } from './ui/skeleton'

export default function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects({ slug: orgSlug }),
    enabled: !!orgSlug,
  })

  const currentProject =
    data && projectSlug
      ? data.projects.find((project) => project.slug === projectSlug)
      : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded-sm text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {isLoading ? (
          <>
            <Skeleton className="size-6 shrink-0 rounded-full" />
            <Skeleton className="size-6 w-full" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="size-6">
                  {currentProject.avatarUrl && (
                    <AvatarImage src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="truncate">{currentProject.name}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </>
        )}

        {isLoading ? (
          <Loader2 className="ml-auto size-4 shrink-0 animate-spin text-muted-foreground" />
        ) : (
          <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        {data && data.projects.length > 0 && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="max-h-52 overflow-auto">
                {data.projects.map((project) => {
                  return (
                    <DropdownMenuItem key={project.id} asChild>
                      <Link
                        href={`/org/${orgSlug}/project/${project.slug}`}
                        className="flex items-center"
                      >
                        <Avatar className="mr-2 size-6">
                          {project.avatarUrl && (
                            <AvatarImage src={project.avatarUrl} />
                          )}
                          <AvatarFallback />
                        </Avatar>
                        <div className="grid">
                          <span className="line-clamp-1 text-sm font-medium">
                            {project.name}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {project.slug.toLocaleLowerCase()}
                          </span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </ScrollArea>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href={`/org/${orgSlug}/create-project`}>
            <Plus className="mr-2 size-5" />

            <span className="text-sm font-medium">Create project</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
