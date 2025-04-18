import { Card, CollectionCard } from "../models";
import { CardsCreationAttributes } from "../types/card.types";
import { FAKEUSERID, FAKEUSERIDLOGED } from "../utils/fakeData";
import { CustomValidationError } from "./customErrors.service";

class CardService {

  async validate(data:CardsCreationAttributes, collectionID:number, cardID?:number) {
    const errors = [];
    if(!cardID) {
      if(!data.alternatives || !data.answer || !data.question || !data.title) {
        errors.push({message:"missing values to create a Card", path:"create card validate", value:data});
      }
    } else {
      
    }
    
    if(data.title && (data.title.length < 3 || data.title.length > 40)) {
      errors.push({message:"Title's length must be between 3 and 40", path:"title", value:data.title});
    }

    if(data.question && (data.question.length < 3 || data.question.length > 255)) {
      errors.push({message:"question's length must be between 3 and 255", path:"question", value:data.question});
    }

    if(data.alternatives && (Object.keys(data.alternatives).length < 2 || Object.keys(data.alternatives).length > 5)) {
      errors.push({message:"the number of alternatives must be between 2 and 5", path:"alternatives"});
    }

    if(data.answer && data.answer < 0 || data.answer > 4) {
      errors.push({message:"Please, select the correct answer", path:"answer", value:data.answer});
    }
    if(data.answer && ((Object.keys(data.alternatives)).length - 1) < data.answer) {
      errors.push({message:"The answer must match one of the keys in alternatives", path:"answer", value:data.answer});
    }

    if(errors.length > 0) {
      throw new CustomValidationError(errors);
    }
    return;
  }

  async create(collectionID: number, cardData: CardsCreationAttributes):Promise<Card> {
    this.validate(cardData, collectionID);

    const newCard = await Card.create(cardData);
    await CollectionCard.create({
      collectionID,
      cardID: newCard.cardID,
    });

    return newCard;
  }

  async update(collectionID: number, cardID: number, cardData: CardsCreationAttributes) {
    this.validate(cardData, collectionID, cardID);
    if(!(await this.validatePublicProcess(cardID, collectionID))) return;

    const card = await Card.findByPk(cardID);
    if (!card) throw new CustomValidationError([{message:"Card not found",path:"card update"}]);

    const association = await CollectionCard.findOne({
      where: { cardID, collectionID },
    });
    if (!association) {
      throw new  CustomValidationError([{
        message:"Card does not belong to the specify collection",
        path:"card update",
        value:card 
      }]);
    }

    await card.update(cardData);
    return card;
  }

  async validatePublicProcess(cardID:number, collectionID:number):Promise<boolean> {
    const errors = [];
    
    const card = await Card.findByPk(cardID);
    if(!card) {
      errors.push({message:"sorry, we can't update this card", path:"update card"});
      return false;
    }
      if(card.public && card.ownerID !== FAKEUSERIDLOGED) {
        const newCard = await Card.create({
          ownerID: FAKEUSERIDLOGED,
          public:card.public,
          title:card.title,
          question: card.question,
          alternatives: card.alternatives,
          answer: card.answer,
        }
      );
      if(newCard) {
        await CollectionCard.create({
          collectionID: collectionID,
          cardID: newCard.cardID,
        });
        const oldCollectionCard = await CollectionCard.findOne({where: {
          collectionID: collectionID,
          cardID: card.cardID,
        }});
        if(oldCollectionCard) oldCollectionCard.destroy();
        return false;
      }
      errors.push({message:"Error --update--copy--Card Error", path:"validate public Process"});
    }
    if(errors.length > 0) {
      throw new CustomValidationError(errors);
    }
    return true;
  }
}

export default new CardService();
