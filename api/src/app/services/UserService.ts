import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class UserService {
  static async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const emailExists = await UsersRepository.validateEmail(email);

      if (emailExists) {
        return res.status(400).send({ error: 'Email already exists' });
      }

      if (!name || !email || !password) {
        return res.status(400).send({ error: 'Name, email and password are required' });
      }

      const hashedPassword = await hash(password, 12);

      const user = await UsersRepository.signup({ name, email, hashedPassword });

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);

      res.json(accessToken);
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }
  static async signin(req: Request, res: Response) {
    return res.status(200).send({ message: 'test signin ok' });
  }
}
