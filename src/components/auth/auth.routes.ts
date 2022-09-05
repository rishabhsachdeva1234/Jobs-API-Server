import { Router } from "express";
import { RoutesEnum } from "../../enums/routes.enum";
import { AuthController } from "./auth.controller";
export const authRouter: Router = Router();

authRouter.post(RoutesEnum.login, AuthController.login);

authRouter.get(RoutesEnum.register, AuthController.register);
