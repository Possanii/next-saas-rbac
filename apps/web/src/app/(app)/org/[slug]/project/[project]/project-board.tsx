'use client'

import { useParams } from 'next/navigation'

export default function ProjectBoard() {
  const params = useParams<{ project: string }>()

  return <div>Project Dashboard: {params.project}</div>
}
