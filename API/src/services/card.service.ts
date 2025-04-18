import { Card, CollectionCard } from "../models";
import { CardsCreationAttributes, SearchParams } from "../types/card.types";
import { CustomValidationError, ErrorMessege } from "./customErrors.service";

class CardService {
  async validateCardData(data: CardsCreationAttributes, isCreate: boolean = true): Promise<void> {
    const errors: ErrorMessege[] = [];

    if (isCreate) {
      if (!data.alternatives || !data.answer || !data.question || !data.title) {
        errors.push({
          message: "Missing required fields for card creation",
          path: "create card",
          value: data,
        });
      }
    }

    if (data.title !== undefined) {
      if (typeof data.title !== "string") errors.push({ message: "type error", path: "title" });
      if (data.title.length < 3 || data.title.length > 40) {
        errors.push({
          message: "Title's length must be between 3 and 40",
          path: "title",
          value: data.title,
        });
      }
    }

    if (data.question !== undefined) {
      if (typeof data.question !== "string") errors.push({ message: "type error", path: "question" });
      if (data.question.length < 3 || data.question.length > 255) {
        errors.push({
          message: "Question's length must be between 3 and 255",
          path: "question",
          value: data.question,
        });
      }
    }

    if (data.alternatives !== undefined) {
      if (typeof data.alternatives !== "object") errors.push({ message: "type error", path: "alternatives" });
      const altKeys = Object.keys(data.alternatives);
      if (altKeys.length < 2 || altKeys.length > 5) {
        errors.push({
          message: "Number of alternatives must be between 2 and 5",
          path: "alternatives",
        });
      }
      Object.values(data.alternatives).forEach((value) => {
        if (typeof value !== "string") {
          errors.push({ message: "type error", path: "alternatives values", value:`${value}`});
        }
      });
    }

    if (data.answer !== undefined) {
      if (typeof data.answer !== "number") errors.push({ message: "type error", path: "answer" });
      if (data.answer < 0 || data.answer > 4) {
        errors.push({
          message: "Answer must be a number between 0 and 4",
          path: "answer",
          value: data.answer,
        });
      }

      if (data.alternatives && data.answer >= Object.keys(data.alternatives).length) {
        errors.push({
          message: "Answer must match one of the keys in alternatives",
          path: "answer",
          value: data.answer,
        });
      }
    }

    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  async cloneAndRelinkCard(
    card: Card,
    collectionID: number,
    userID: number,
    newData: CardsCreationAttributes
  ): Promise<Card> {
    const clonedCard = await Card.create({
      ...newData,
      ownerID: userID,
      public: false,
    });

    await CollectionCard.create({ collectionID, cardID: clonedCard.cardID });

    // Remove old relation
    await CollectionCard.destroy({ where: { collectionID, cardID: card.cardID } });

    return clonedCard;
  }

  async create(collectionID: number, cardData: CardsCreationAttributes, userID: number): Promise<Card> {
    await this.validateCardData(cardData, true);

    const newCard = await Card.create({ ...cardData, ownerID: userID, public: false });
    await CollectionCard.create({ collectionID, cardID: newCard.cardID });

    return newCard;
  }

  async update(collectionID: number, cardID: number, cardData: CardsCreationAttributes, userID: number): Promise<Card> {
    const card = await Card.findByPk(cardID);
    if (!card) throw new CustomValidationError([{ message: "Card not found", path: "update" }]);
    await this.validateCardData(cardData, false);

    // Handle public/private logic
    if (card.public && card.ownerID !== userID) {
      return this.cloneAndRelinkCard(card, collectionID, userID, cardData);
    }

    // Update directly
    await card.update(cardData);
    return card;
  }

  async get(collectionID: number, userID: number, search: SearchParams, limit = 10, offset = 0): Promise<Card[]> {
    const cards = await Card.findAll({ where: search, limit: limit, offset: offset });
    return cards;
  }

  async getOne(collectionID: number, userID: number, search: SearchParams): Promise<Card> {
    const card = await Card.findOne({ where: search });
    if (!card) throw new CustomValidationError([{ message: "card not found!", path: "get one card" }]);
    return card;
  }

  async delete(cardID: number, userID: number): Promise<Card> {
    const card = await Card.findByPk(cardID);
    if (!card) throw new CustomValidationError([{ message: "Card not found", path: "delete" }]);

    if (card.ownerID !== userID) {
      throw new CustomValidationError([{ message: "You can't delete this card!", path: "delete" }]);
    }

    // Update directly
    await card.destroy();
    return card;
  }
}

export default new CardService();
