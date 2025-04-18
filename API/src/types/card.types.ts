import { Optional } from "sequelize";
import Card from "../models/Card";

export interface CardsAttributes {
  cardID: number;
  ownerID: number;
  public: boolean;
  title: string;
  question: string;
  alternatives: Record<string, string>;
  answer: number;
  created_at: Date;
  updated_at: Date;
}

// Campos Opcionais
export interface CardsCreationAttributes extends Optional<CardsAttributes, "cardID" | "ownerID" | "created_at" | "updated_at"> {}

export type SearchParams = {
  cardID?: number;
  ownerID?: number;
  title?: string;
  question?: string;
}