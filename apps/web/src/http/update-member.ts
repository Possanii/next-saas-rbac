import type { Role } from '@saas/auth'

import { api } from './api-client'

interface UpdateMemberRequest {
  org: string
  member: string
  role: Role
}

type UpdateMemberResponse = void

export async function updateMember({
  org,
  member,
  role,
}: UpdateMemberRequest): Promise<UpdateMemberResponse> {
  await api.put(`organizations/${org}/members/${member}`, {
    json: { role },
  })
}
