import prisma from '../prisma'

export const shareDocument = async (documentId: number, userId: number, canEdit: boolean) => {
  return prisma.permission.create({
    data: { documentId, userId, canEdit }
  })
}
