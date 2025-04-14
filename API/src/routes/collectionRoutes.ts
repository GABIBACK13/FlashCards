import { Router } from 'express';
import collectionController from '../controllers/Collection';

const router = Router();

router.get("/", collectionController.index);

export default router;