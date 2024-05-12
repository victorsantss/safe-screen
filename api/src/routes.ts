import { Router } from "express";
import UserController from "./app/controllers/UserController";

export const router = Router();

router.post('/user/signup', UserController.signup)
router.post('/user/signin', UserController.signin)
router.get('/user/me', UserController.me)

