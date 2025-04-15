import { Collection } from "../models";
import { CustomValidationError } from "./customErrors.service";
import {collectionBody} from "../types/collection.types";

class CollectionService {
  
  validate(collection:collectionBody): void {
    const errors = [];

    
    if (!collection.name || collection.name.length < 3 || collection.name.length > 40) {
      errors.push({ message: "Name must be between 3 and 40", path: "name", value: collection.name });
    }
  
    if (collection.private && typeof collection.private !== "boolean") {
      errors.push({ message: "Invalid value for 'private'", path: "private", value: collection.private });
    }
  
    if (collection.allowed && typeof collection.allowed === "object") {
      if (Object.keys(collection.allowed).length > 3) {
        errors.push({ message: "You can't allow more than 3 users", path: "allowed", value: collection.allowed });
      }
    }
  
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  async create(collection: collectionBody):Promise<Collection> {
    this.validate(collection);
    const collectionSaved = await Collection.create(collection);
    return collectionSaved;
  }

  async getAll():Promise<Collection[]> {
    const collections = await Collection.findAll({limit: 10, offset:0});
    return collections;
  }
}

export default new CollectionService();