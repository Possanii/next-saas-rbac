'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import {
  createOrganizationAction,
  type OrganizationSchema,
  updateOrganizationAction,
} from '../create-organization/action'

interface ICreateOrganizationFormProps {
  isUpdating?: boolean
  initialData?: OrganizationSchema
}

export function CreateOrganizationForm({
  isUpdating = false,
  initialData,
}: ICreateOrganizationFormProps) {
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState({
    action: formAction,
    onSuccess: (data) => {
      if (data) {
        redirect(`/org/${data!.organizationSlug}`)
      }
    },
  })

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-2">
        <Label htmlFor="name">Organization name</Label>
        <Input
          id="name"
          name="name"
          errors={errors?.name && errors.name[0]}
          defaultValue={initialData?.name}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">E-mail domain</Label>
        <Input
          id="domain"
          name="domain"
          placeholder="example.com"
          inputMode="url"
          errors={errors?.domain && errors.domain[0]}
          defaultValue={initialData?.domain ?? undefined}
        />
      </div>
      <div className="items-top flex space-x-2">
        <Checkbox
          id="shouldAttachUsersByDomain"
          name="shouldAttachUsersByDomain"
          defaultChecked={initialData?.shouldAttachUsersByDomain}
        />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>
            <p className="text-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
