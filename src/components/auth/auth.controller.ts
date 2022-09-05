import { Response } from "express";
import { CustomRequest } from "../../interfaces/common-interface";
import { LoginRequest } from "./request-interfaces/login-request.interface";
import { RegisterRequest } from "./request-interfaces/register-request.interface";
import { StatusCodes } from "http-status-codes";
import { appDataSource } from "../../data-source";
import { UserEntity } from "./entity/user.entity";
import { sign } from "jsonwebtoken";

export class AuthController {
  static async login(req: CustomRequest<LoginRequest>, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await appDataSource.manager.findOne(UserEntity, {
        where: { email },
      });
      if (!user)
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "user not found" });

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "password is incorrect" });

      const payload = { id: user.id, email: user.email };
      const secretKey = process.env.JWT_SECRET_KEY!;
      const token = sign(payload, secretKey, {
        expiresIn: "2hr",
      });

      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async register(req: CustomRequest<RegisterRequest>, res: Response) {
    try {
      const { firstName, lastName, dateOfBirth, email, gender, password } =
        req.body;
      const userDetails = new UserEntity();
      userDetails.firstName = firstName;
      userDetails.lastName = lastName;
      userDetails.dateOfBirth = new Date(dateOfBirth);
      userDetails.password = password;
      userDetails.email = email;
      userDetails.gender = gender;

      await appDataSource.manager.save(userDetails);
      res
        .status(StatusCodes.CREATED)
        .json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
