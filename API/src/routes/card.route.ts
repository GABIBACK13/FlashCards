import { Router } from "express";
import CardController from "../controllers/card.controller";

const router = Router({ mergeParams: true });

router.post("/", CardController.store);
router.put("/:cardID", CardController.update);
// depois podemos adicionar GET e DELETE

export default router;
