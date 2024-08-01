'use client'

import { useParams } from 'next/navigation'

export default function ProjectsBoard() {
  const params = useParams<{ slug: string }>()

  return <div>Projects Dashboard: {params.slug}</div>
}
