import { Request, RequestHandler, Response } from "express";
import CardService from "../services/card.service";
import errorHandler from "../utils/errorHandler";

class CardController {

  store: RequestHandler = async (req: Request, res: Response) => {
    const { collectionID } = req.params;

    try {
      const newCard = await CardService.create(Number(collectionID), req.body);
      res.status(201).json(newCard);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  }

  update: RequestHandler = async (req: Request, res: Response) => {
    const { collectionID, cardID } = req.params;

    try {
      const updatedCard = await CardService.update(Number(collectionID), Number(cardID), req.body);
      res.status(200).json(updatedCard);
      return;
      
    } catch (error: any) { return errorHandler(error, res) }
  }
}

export default new CardController();
