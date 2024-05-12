import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface User {
  name: string;
  email: string;
  password: string;
}

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

      const accessToken = this.generateAccessToken(user);

      res.json({ accessToken });
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }

  static async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UsersRepository.findUser(email);

      if (!user) {
        return res.status(400).send({ error: 'User not found' });
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).send({ error: 'Invalid Credentials' });
      }

      const accessToken = this.generateAccessToken(user);

      res.status(201).json({ accessToken });
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }

  static async me(req: Request, res: Response) {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      return res.status(401).send({ error: 'Token not provided' });
    }

    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      res.json(payload);
    } catch (error) {
      return res.status(403).send({ error: 'Invalid token' });
    }
  }

  private static generateAccessToken(user: User) {
    const { password, ...userWithoutPassword } = user;

    return jwt.sign(userWithoutPassword, process.env.ACCESS_TOKEN_SECRET as string);
  }
  private static extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
