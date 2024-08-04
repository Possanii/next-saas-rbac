import { queryOptions } from '@tanstack/react-query'

import { getProjects } from '@/http/get-projects'

interface UseQueryProjectsProps {
  org: string
}

export function useQueryProjects({ org }: UseQueryProjectsProps) {
  return queryOptions({
    queryKey: [org, 'projects'],
    queryFn: () => getProjects({ slug: org }),
    enabled: !!org,
  })
}
