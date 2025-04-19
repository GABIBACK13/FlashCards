import { Router } from "express";
import collectionController from "../controllers/collection.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, collectionController.index);
router.post("/", authMiddleware, collectionController.store);
router.patch("/:id", authMiddleware, collectionController.patch);
router.delete("/:id", authMiddleware, collectionController.delete);

export default router;
