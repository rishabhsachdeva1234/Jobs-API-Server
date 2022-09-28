import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginRequest } from "../components/auth/request-interfaces/login-request.interface";
import { userRoles } from "../constants/user-roles.constant";
import { CustomRequest } from "../interfaces/common-interface";

export const validateUserRole = (role: typeof userRoles[number]) => {
  return function (
    req: CustomRequest<LoginRequest>,
    res: Response,
    next: NextFunction
  ) {
    if (role !== req.user?.role)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized user!" });
    next();
  };
};
