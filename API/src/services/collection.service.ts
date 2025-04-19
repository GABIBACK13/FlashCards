import { Collection } from "../models";
import { CustomValidationError } from "./customErrors.service";
import {collectionBody, SearchParams } from "../types/collection.types";
import { UserData } from "../middlewares/auth.middleware";

class CollectionService {
  
  validate(collection:collectionBody, collectionID?: number): void {
    const errors = [];
    if(!collectionID) {
      if (!collection.name || collection.name.length < 3 || collection.name.length > 40) {
        errors.push({ message: "Name must be between 3 and 40", path: "name", value: collection.name });
      }
      if(!collection.private) collection.private = false;

  } else /* CollectionID exists*/{
    if(collection.name && (collection.name.length < 3 || collection.name.length > 40)) {
      errors.push({ message: "Name must be between 3 and 40", path: "name", value: collection.name });
    }
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

  validateUserData(userData:UserData) {

  }

  async create(collection: collectionBody, userData:UserData):Promise<Collection> {
    this.validateUserData(userData);
    this.validate(collection);
    const collectionSaved = await Collection.create({...collection, userID:userData.userID});
    return collectionSaved;
  }

  async getAll( userData:UserData, limit:number=10, offset:number=0, where:SearchParams={}):Promise<Collection[]> {
    this.validateUserData(userData);
    const collections = await Collection.findAll({where:{userID:userData.userID,...where} ,limit: limit, offset:offset});
    return collections;
  }

  async getOne( where:SearchParams={}, userData:UserData):Promise<Collection | null> {
    this.validateUserData(userData);
    const collection = await Collection.findOne({where:{userID:userData.userID, ...where}});
    return collection;
  }

  async updateOne(collection: collectionBody, id:number, userData:UserData ):Promise<Collection> {
    this.validateUserData(userData);
    this.validate(collection, id);

    const [updated] = await Collection.update(collection, {where:{collectionID:id, userID:userData.userID}});
    if(updated === 0) {
      throw new CustomValidationError([
        {
          message:"the selected collection doesn't exists", 
          path:"update one service",
          value:collection
        }]);
      } else {
        const updatedCollection = await this.getOne({collectionID:id}, userData);
        return updatedCollection as Collection;
    }
  }

  async deleteOne(id:number, userData:UserData):Promise<Collection> {
    const removedCollection = await this.getOne({collectionID:id}, userData);
    if(!removedCollection) {
      throw new CustomValidationError([
        {
          message:"the selected collection doesn't exists", 
          path:"delete one service",
          value:`collectionID: ${id}`
        }
      ]);
    }
    await removedCollection.destroy();
    return removedCollection as Collection;
  }
}

export default new CollectionService();