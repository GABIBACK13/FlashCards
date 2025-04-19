import { Collection } from "../models";
import { Optional } from "sequelize";

export type Allowed = Record<string, number> | null;

export interface collectionBody extends CollectionCreationAttributes, Body {
  name: string;
  private: boolean;
  allowed?: Allowed;
}

export type SearchParams = {
  collectionID?: number;
  userID?:number;
  name?: string;
  private?: boolean;
  allowed?: Allowed;
};

export interface CollectionAttributes {
  collectionID: number;
  userID:number;
  name: string;
  private: boolean;
  allowed: Record<string, number> | null;
  created_at: Date;
  updated_at: Date;
}

// Campos Opcionais
export interface CollectionCreationAttributes
  extends Optional<CollectionAttributes, "collectionID" | 'userID' |"created_at" | "updated_at" | "allowed"> {}
