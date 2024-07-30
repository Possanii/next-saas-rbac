'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signUpAction } from './actions'

export default function SignUpForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState({
    action: signUpAction,
    onSuccess: () => {
      router.push('/auth/sign-in')
    },
  })
  return (
    <div className="grid gap-4">
      <form onSubmit={handleSubmit} className="grid gap-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign Up failed!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Max"
            required
            errors={errors?.name && errors.name[0]}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            errors={errors?.email && errors.email[0]}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            errors={errors?.password && errors.password[0]}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password-confirmation">Confirm your password</Label>
          <Input
            id="password-confirmation"
            name="password_confirmation"
            type="password"
            required
            errors={
              errors?.password_confirmation && errors.password_confirmation[0]
            }
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Register'}
        </Button>
      </form>
      <form action={signInWithGithub}>
        <Button
          type="submit"
          variant="outline"
          formAction={signInWithGithub}
          className="w-full"
        >
          <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
          Login with Github
        </Button>
      </form>
    </div>
  )
}
