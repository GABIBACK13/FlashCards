import { Request, RequestHandler, Response } from "express";
import CardService from "../services/card.service";
import errorHandler from "../utils/errorHandler";

class CardController {

  store: RequestHandler = async (req: Request, res: Response) => {
    const { collectionID } = req.params;

    try {
      const newCard = await CardService.create(Number(collectionID), req.body, 1);
      res.status(201).json(newCard);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  }

  update: RequestHandler = async (req: Request, res: Response) => {
    const { collectionID, cardID } = req.params;

    try {
      const updatedCard = await CardService.update(Number(collectionID), Number(cardID), req.body, 1);
      res.status(200).json(updatedCard);
      return;
      
    } catch (error: any) { return errorHandler(error, res) }
  }

  delete: RequestHandler = async (req: Request, res: Response) => {
    const { cardID } = req.params;

    try {
      const deletedCard = await CardService.delete(Number(cardID), 1);
      res.status(200).json(deletedCard);
      return;
      
    } catch (error: any) { return errorHandler(error, res) }
  }

  index: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { collectionID } = req.params;

      const cards = await CardService.get(Number(collectionID), 1, {});
      res.status(200).json(cards);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  }

  indexOne: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { collectionID, cardID } = req.params;

      const card = await CardService.getOne(Number(collectionID), 1, {cardID:Number(cardID)});
      res.status(200).json(card);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  }
}

export default new CardController();
