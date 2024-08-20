import { api } from './api-client'

interface GetInvitesRequest {
  slug: string
}

interface GetInvitesResponse {
  invites: {
    id: string
    email: string
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
    createdAt: Date
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }[]
}

export async function getInvites({
  slug,
}: GetInvitesRequest): Promise<GetInvitesResponse> {
  const result = await api
    .get(`organizations/${slug}/invites`, {
      next: {
        tags: [`${slug}/invites`],
      },
    })
    .json<GetInvitesResponse>()

  return result
}
