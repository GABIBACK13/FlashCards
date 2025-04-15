import { Request, RequestHandler, Response } from "express";
import { ValidationError } from "sequelize";
import CollectionService from "../services/collection.service";
import { CustomValidationError } from "../services/customErrors.service";

class CollectionController {
  store: RequestHandler = async (req: Request, res: Response) => {
    try {
      const collection = await CollectionService.create(req.body);
      res.status(201).json(collection);
      return;

    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          errors: error.errors.map((err) => ({
            message: err.message,
            path: err.path,
            value: err.value,
          })),
        });
        return;
      }

      if (error instanceof CustomValidationError) {
        res.status(400).json({ errors: error.errors });
        return;
      }

      res.status(500).json({ error: error.message });
      return;
    }
  }

  index: RequestHandler = async (req: Request, res: Response) =>  {
    try {
      const collections = await CollectionService.getAll();
      res.status(201).json(collections);
      return;
    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          errors: error.errors.map((err) => ({
            message: err.message,
            path: err.path,
            value: err.value,
          })),
        });
        return;
      }

      if (error instanceof CustomValidationError) {
        res.status(400).json({ errors: error.errors });
        return;
      }

      res.status(500).json({ error: error.message });
      return;
    }
  }

  patch: RequestHandler = async (req: Request, res: Response) => {
    try {
      const collectionUpdated = await CollectionService.updateOne(req.body, Number(req.params.id));
      res.status(200).json(collectionUpdated);
      return;

    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          errors: error.errors.map((err) => ({
            message: err.message,
            path: err.path,
            value: err.value,
          })),
        });
        return;
      }

      if (error instanceof CustomValidationError) {
        res.status(400).json({ errors: error.errors });
        return;
      }

      res.status(500).json({ error: error.message });
      return;
    }
  } 
  
  delete: RequestHandler = async (req: Request, res: Response) => {
    try {
      const collectionDeleted = await CollectionService.deleteOne(Number(req.params.id));
      res.status(200).json(collectionDeleted);
      return;

    } catch (error: any) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          errors: error.errors.map((err) => ({
            message: err.message,
            path: err.path,
            value: err.value,
          })),
        });
        return;
      }

      if (error instanceof CustomValidationError) {
        res.status(400).json({ errors: error.errors });
        return;
      }

      res.status(500).json({ error: error.message });
      return;
    }
  }
}

export default new CollectionController();
