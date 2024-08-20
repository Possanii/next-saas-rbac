'use server'

import { cookiesStorage } from '@saas/cookies'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address' }),
  password: z
    .string()
    .min(6, { message: 'Please, your password must be 6 characters at least' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors, payload: null }
  }

  try {
    const { email, password } = result.data

    const { token } = await signInWithPassword({
      email,
      password,
    })

    cookies().set(cookiesStorage.AUTH_TOKEN, token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const inviteId = cookies().get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite({ inviteId })
        cookies().delete('inviteId')
      } catch (err) {}
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<{ message: string }>()

      return { success: false, message, errors: null, payload: null }
    }

    console.log(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
      payload: null,
    }
  }

  return { success: true, message: null, errors: null, payload: null }
}
