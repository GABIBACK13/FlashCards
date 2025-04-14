import { Request, Response } from 'express';

class Collection {
  
  async index(req: Request, res: Response): Promise<void> {
    try {
      res.send("your collections");
      return;
    } catch (error) {
      console.error("Erro ao acessar a API:", error);
    }
  }
}
export default new Collection();
