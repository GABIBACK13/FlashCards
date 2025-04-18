import { Request, RequestHandler, Response } from "express";
import CollectionService from "../services/collection.service";
import errorHandler from "../utils/errorHandler";

class CollectionController {
  store: RequestHandler = async (req: Request, res: Response) => {
    try {
      const collection = await CollectionService.create(req.body);
      res.status(201).json(collection);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  }

  index: RequestHandler = async (req: Request, res: Response) =>  {
    try {
      const collections = await CollectionService.getAll();
      res.status(201).json(collections);
      return;
    } catch (error: any) { return errorHandler(error, res) }
  }

  patch: RequestHandler = async (req: Request, res: Response) => {
    try {
      const collectionUpdated = await CollectionService.updateOne(req.body, Number(req.params.id));
      res.status(200).json(collectionUpdated);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  } 
  
  delete: RequestHandler = async (req: Request, res: Response) => {
    try {
      const collectionDeleted = await CollectionService.deleteOne(Number(req.params.id));
      res.status(200).json(collectionDeleted);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  }
}

export default new CollectionController();
