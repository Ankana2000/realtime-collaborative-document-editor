import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';

// Extend Request interface to include user
interface CustomRequest extends Request {
  user?: { id: number }; // Assuming user has an id property
}

export const permissionsMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { documentId } = req.params;
    const userId = req.user.id;

    // Make sure documentId is converted to number if it's coming as a string
    const permission = await prisma.permission.findFirst({
      where: { documentId: Number(documentId), userId }
    });

    // Check for permission
    if (!permission || !permission.canEdit) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
