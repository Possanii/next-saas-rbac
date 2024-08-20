'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, Loader2, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'

import { useQueryPendingInvites } from '@/hooks/use-query/use-query-pending-invites'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { acceptInviteAction, rejectInviteAction } from './actions'

dayjs.extend(relativeTime)

export function PendingInvites() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading } = useQuery(useQueryPendingInvites(isOpen))

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)

    queryClient.invalidateQueries(useQueryPendingInvites(isOpen))
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)

    queryClient.invalidateQueries(useQueryPendingInvites(isOpen))
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-2">
        <strong>Pending invites ({data?.invites.length ?? 0})</strong>

        {isLoading && <Loader2 className="size-6 animate-spin" />}

        {data?.invites.length === 0 && (
          <p className="text-sm text-muted-foreground">No invites found</p>
        )}

        {data?.invites.map((invite) => {
          return (
            <div className="space-y-2" key={invite.id}>
              <p className="text-balance text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {invite.author?.name ?? 'Someone'}
                </span>{' '}
                invited you to join{' '}
                <span className="font-medium text-foreground">
                  {invite.organization.name}
                </span>
                . <span>{dayjs(invite.createdAt).fromNow()}</span>
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleAcceptInvite(invite.id)}
                  size={'xs'}
                  variant={'outline'}
                >
                  <Check className="mr-1.5 size-3" />
                  Accept
                </Button>

                <Button
                  onClick={() => handleRejectInvite(invite.id)}
                  size={'xs'}
                  variant={'ghost'}
                  className="text-muted-foreground"
                >
                  <X className="size-3" />
                  Reject
                </Button>
              </div>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
