import { ability, getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import { CreateOrganizationForm } from '../../create-organization-form'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

export default async function Settings() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  const { organization } = await getOrganization(currentOrg!)

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-medium">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateOrganizationForm isUpdating initialData={organization} />
            </CardContent>
          </Card>
        )}

        {canGetBilling && (
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                Get your organization billing details
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        )}

        {canShutdownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown organization</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                You cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
