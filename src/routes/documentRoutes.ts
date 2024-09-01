import { Router } from 'express';
import { createDocumentController, getDocumentController, deleteDocumentController } from '../controllers/documentController';
import { permissionsMiddleware } from '../middleware/permissionsMiddleware';

const router = Router();

router.post('/', createDocumentController);
router.get('/:id', getDocumentController);
router.delete('/:id', permissionsMiddleware, deleteDocumentController);

export default router;
