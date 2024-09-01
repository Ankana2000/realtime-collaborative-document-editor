// src/routes/collaborationRoutes.ts
import { Router } from 'express';
import collaborationController from '../controllers/collaborationController';

const router = Router();

// Define routes
router.post('/share', collaborationController.share);

export default router;
