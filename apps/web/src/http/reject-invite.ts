import { api } from './api-client'

interface RejectInviteRequest {
  inviteId: string
}

type RejectInviteResponse = void

export async function rejectInvite({
  inviteId,
}: RejectInviteRequest): Promise<RejectInviteResponse> {
  await api.post(`invites/${inviteId}/reject`)
}
