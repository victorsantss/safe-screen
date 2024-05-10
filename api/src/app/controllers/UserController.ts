import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';


class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const user = await UsersRepository.create({ name });

      res.json(user);
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }
}

export default new UserController();
