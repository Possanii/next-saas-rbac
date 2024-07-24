import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['projects'],
          summary: 'Create a new project',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              projectId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { sub } = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(sub, membership.role)

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError(
            "You're not allowed to create new projects."
          )
        }

        const { name, description } = request.body

        const project = await prisma.project.create({
          data: {
            name: name,
            slug: createSlug(name),
            descriptions: description,
            organizationId: organization.id,
            ownerId: sub,
          },
        })

        return reply.status(201).send({
          projectId: project.id,
        })
      }
    )
}
