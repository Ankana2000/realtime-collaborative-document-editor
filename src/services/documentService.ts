import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createDocument = async (title: string, content: string, userId: number) => {
  return prisma.document.create({
    data: {
      title,
      content,
      authorId: userId
    }
  });
};

export const getDocumentById = async (id: number) => {
  return prisma.document.findUnique({
    where: { id }
  });
};

export const deleteDocumentById = async (id: number) => {
  return prisma.document.delete({
    where: { id }
  });
};
