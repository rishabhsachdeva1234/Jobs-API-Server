import { Router } from "express";
import { RoutesEnum } from "../../enums/routes.enum";
import { validateToken } from "../../middlewares/validate-token";
import { validateUserRole } from "../../middlewares/validate-user-role.middleware";
import { AuthController } from "./auth.controller";
export const authRouter: Router = Router();

authRouter.get(
  RoutesEnum.userDetails,
  validateToken,
  validateUserRole("Admin"),
  AuthController.getUserDetails
);

authRouter.post(RoutesEnum.login, AuthController.login);

authRouter.post(RoutesEnum.register, AuthController.register);
