import { Router } from 'express';
import collectionController from '../controllers/collection.controller';

const router = Router();

router.get("/", collectionController.index);
router.post("/", collectionController.store);

export default router;