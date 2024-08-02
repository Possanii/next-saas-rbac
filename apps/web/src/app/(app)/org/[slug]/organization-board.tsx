'use client'

import { useParams } from 'next/navigation'

export default function OrganizationBoard() {
  const params = useParams<{ slug: string }>()

  return <div>Organization Dashboard: {params.slug}</div>
}
