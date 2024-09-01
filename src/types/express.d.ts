// src/types/express.d.ts
import { User } from '@prisma/client'; // Or your user model

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number; // Adjust based on what properties you need
        email?: string;
        password?: string;
      };
    }
  }
}
