import { Router } from "express";
import UserController from "./app/controllers/UserController";

export const router = Router();

router.post('/users', UserController.create)

