import { Collection } from "../models";

export type Allowed = Record<string, number> | null;

export interface collectionBody extends Body {
  name: string;
  private: boolean;
  allowed?: Allowed;
}

export type SearchParams = {
  collectionID?: number;
  name?: string;
  private?: boolean;
  allowed?: Allowed;
};
