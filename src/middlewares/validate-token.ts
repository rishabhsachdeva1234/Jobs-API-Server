import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { CustomRequest, JWTTokenData } from "../interfaces/common-interface";
import { LoginRequest } from "../components/auth/request-interfaces/login-request.interface";
import { StatusCodes } from "http-status-codes";
import { LoginSessionController } from "../components/login-session/login-session.controller";

export const validateToken = async (
  req: CustomRequest<LoginRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] ?? "invalid";

    const secretKey = process.env.JWT_SECRET_KEY!;
    const decryptedToken: JWTTokenData = verify(
      token,
      secretKey
    ) as JWTTokenData;

    const isSessionValid = await LoginSessionController.verifySession(
      decryptedToken.id,
      decryptedToken.sessionKey
    );

    if (!isSessionValid)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Session expired, please login again" });

    req.user = { ...decryptedToken };
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized user!" });
  }
};
