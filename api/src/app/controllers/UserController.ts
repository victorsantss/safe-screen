import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController {
  async signup(req: Request, res: Response) {
    return UserService.signup(req, res);
  }

  async signin(req: Request, res: Response) {
    return UserService.signin(req, res);
  }

  async me(req: Request, res: Response) {
    return UserService.me(req, res);
  }
}

export default new UserController();
