import { cookiesStorage } from '@saas/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get(cookiesStorage.AUTH_TOKEN)?.value
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
