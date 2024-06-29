import { z } from 'zod'

export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('delete'),
    z.literal('invite'),
  ]),
  z.literal('User'),
])

export type UserSubject = z.infer<typeof userSubject>
