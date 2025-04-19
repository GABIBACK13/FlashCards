import { Request, RequestHandler, Response } from "express";
import CollectionService from "../services/collection.service";
import errorHandler from "../utils/errorHandler";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { CustomValidationError } from "../services/customErrors.service";

class CollectionController {
  store: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
      if(!req.user) throw new CustomValidationError([{message:"no user data", path:"collection"}]);
      const collection = await CollectionService.create(req.body, req.user);
      res.status(201).json(collection);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  }

  index: RequestHandler = async (req: AuthenticatedRequest, res: Response) =>  {
    try {
      if(!req.user) throw new CustomValidationError([{message:"no user data", path:"collection"}]);
      const collections = await CollectionService.getAll(req.user);
      res.status(201).json(collections);
      return;
    } catch (error: any) { return errorHandler(error, res) }
  }

  patch: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
      if(!req.user) throw new CustomValidationError([{message:"no user data", path:"collection"}]);
      const collectionUpdated = await CollectionService.updateOne(req.body, Number(req.params.id), req.user);
      res.status(200).json(collectionUpdated);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  } 
  
  delete: RequestHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
      if(!req.user) throw new CustomValidationError([{message:"no user data", path:"collection"}]);
      const collectionDeleted = await CollectionService.deleteOne(Number(req.params.id), req.user);
      res.status(200).json(collectionDeleted);
      return;

    } catch (error: any) { return errorHandler(error, res) }
  }
}

export default new CollectionController();
