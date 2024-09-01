import prisma from '../prisma'

export const createVersion = (content: string, documentId: number) => {
  return prisma.version.create({
    data: { content, documentId }
  })
}
