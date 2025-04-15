export type Allowed = Record<string, number> | null;

export interface collectionBody extends Body {
  name: string;
  private: boolean;
  allowed?: Allowed;
}