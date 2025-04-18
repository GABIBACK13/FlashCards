import { Router } from "express";
import CardController from "../controllers/card.controller";

const router = Router({ mergeParams: true });

router.post("/", CardController.store);
router.put("/:cardID", CardController.update);
router.get("/", CardController.index);
router.get("/:cardID", CardController.indexOne);
router.delete("/:cardID", CardController.delete);
export default router;
