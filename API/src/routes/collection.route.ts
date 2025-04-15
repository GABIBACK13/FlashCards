import { Router } from 'express';
import collectionController from '../controllers/collection.controller';

const router = Router();

router.get("/", collectionController.index);
router.post("/", collectionController.store);
router.patch("/:id", collectionController.patch);
router.delete("/:id", collectionController.delete);

export default router;