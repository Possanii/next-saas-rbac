import { cookiesStorage } from '@saas/cookies'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      {
        message: 'Github OAuth code was not found.',
      },
      { status: 400 },
    )
  }

  try {
    const { token } = await signInWithGithub({ code })

    cookies().set(cookiesStorage.AUTH_TOKEN, token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const redirectURL = request.nextUrl.clone()

    redirectURL.pathname = '/'
    redirectURL.search = ''

    return NextResponse.redirect(redirectURL)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<{ message: string }>()

      return NextResponse.json(
        {
          message,
        },
        { status: 422 },
      )
    }

    const inviteId = cookies().get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite({ inviteId })
        cookies().delete('inviteId')
      } catch (err) {}
    }

    const redirectURL = request.nextUrl.clone()

    redirectURL.pathname = '/'
    redirectURL.search = ''

    return NextResponse.redirect(redirectURL + '/auth/sign-in')
  }
}
