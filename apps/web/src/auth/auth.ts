import { defineAbilityFor } from '@saas/auth'
import { cookiesStorage } from '@saas/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get(cookiesStorage.AUTH_TOKEN)?.value
}

export function getCurrentOrg() {
  return cookies().get(cookiesStorage.ORG)?.value ?? null
}

export async function getCurrentMembership() {
  const org = getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership({ slug: org })

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const token = cookies().get(cookiesStorage.AUTH_TOKEN)?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (err) {}

  redirect('/api/auth/sign-out')
}
