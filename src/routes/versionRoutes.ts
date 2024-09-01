// src/routes/versionRoutes.ts
import { Router } from 'express';
import { someControllerFunction, anotherControllerFunction } from '../controllers/versionController';

const router = Router();

// Define routes
router.get('/some-endpoint', someControllerFunction);
router.post('/another-endpoint', anotherControllerFunction);

export default router;
