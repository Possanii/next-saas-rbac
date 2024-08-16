import type { Role } from '@saas/auth'

import { api } from './api-client'

interface IGetMembersResponse {
  members: {
    name: string | null
    id: string
    avatarUrl: string | null
    role: Role
    userId: string
    email: string
  }[]
}

export async function getMembers(org: string): Promise<IGetMembersResponse> {
  const result = await api
    .get(`organizations/${org}/members`)
    .json<IGetMembersResponse>()

  return result
}
