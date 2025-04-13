import { Request, Response } from 'express';

class HomeController {
  async index(req: Request, res: Response) {
    try {
      return res.json(null);
    } catch (error) {
      console.error("Erro ao acessar a API:", error);
    }
  }
}

export default new HomeController();
