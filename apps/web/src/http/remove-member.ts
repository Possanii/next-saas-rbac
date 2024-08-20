import { api } from './api-client'

interface RemoveMemberRequest {
  org: string
  member: string
}

type RemoveMemberResponse = void

export async function removeMember({
  org,
  member,
}: RemoveMemberRequest): Promise<RemoveMemberResponse> {
  await api.delete(`organizations/${org}/members/${member}`)
}
