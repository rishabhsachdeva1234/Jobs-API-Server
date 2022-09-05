import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { CustomRequest, JWTVerifiedUser } from "../interfaces/common-interface";
import { LoginRequest } from "../components/auth/request-interfaces/login-request.interface";
import { StatusCodes } from "http-status-codes";

export const validateToken = async (
  req: CustomRequest<LoginRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] ?? "invalid";
    const secretKey = process.env.JWT_SECRET_KEY!;
    const verifiedUser: JWTVerifiedUser = verify(token, secretKey) as any;
    req.user = { ...verifiedUser };
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized user!" });
  }
};
