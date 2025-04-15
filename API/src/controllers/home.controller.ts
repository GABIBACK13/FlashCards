import { Request, Response } from 'express';
import homeOptions from '../jsonFiles/home';

class HomeController {
  async index(req: Request, res: Response): Promise<void> {
    try {
      res.json(homeOptions);
      return;
    } catch (error) {
      console.error("Erro ao acessar a API:", error);
    }
  }
}

export default new HomeController();
