import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import SignUpForm from './sign-up-form'

export default function SignUpPage() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
