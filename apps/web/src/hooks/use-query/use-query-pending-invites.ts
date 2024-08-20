import { queryOptions } from '@tanstack/react-query'

import { getPendingInvites } from '@/http/get-pending-invites'

export function useQueryPendingInvites(isOpen: boolean) {
  return queryOptions({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
    enabled: isOpen,
  })
}
