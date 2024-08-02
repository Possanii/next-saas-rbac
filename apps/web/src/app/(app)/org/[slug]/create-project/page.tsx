import { redirect } from 'next/navigation'

import { ability } from '@/auth/auth'

import { CreateProjectForm } from './create-project-form'

export default async function CreateOrganization() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return <CreateProjectForm />
}
