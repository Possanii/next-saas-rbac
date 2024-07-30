import { cookiesStorage } from '@saas/cookies'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = request.nextUrl.clone()

  redirectURL.pathname = '/auth/sign-in'

  cookies().delete(cookiesStorage.AUTH_TOKEN)

  return NextResponse.redirect(redirectURL)
}
