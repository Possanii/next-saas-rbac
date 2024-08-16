import { ability } from '@/auth/auth'

import { Invites } from './invites'
import { MembersList } from './members-list'

export default async function MembersPage() {
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-medium">Members</h1>

      <div>
        {permissions?.can('get', 'Invite') && <Invites />}
        {permissions?.can('get', 'User') && <MembersList />}
      </div>
    </div>
  )
}
