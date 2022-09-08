import { Response } from "express";
import { CustomRequest } from "../../interfaces/common-interface";
import { LoginRequest } from "./request-interfaces/login-request.interface";
import { RegisterRequest } from "./request-interfaces/register-request.interface";
import { StatusCodes } from "http-status-codes";
import { appDataSource } from "../../data-source";
import { UserEntity } from "./entity/user.entity";
import { sign } from "jsonwebtoken";
import { UserDetailsDto } from "./dto/user-details.dto";
import { validateRequest } from "../../functions/validate-request.function";
import { UserAuthDto } from "./dto/user-auth.dto";
import { CustomError } from "../../classes/custom-error.class";
import { LoginSessionController } from "../login-session/login-session.controller";

export class AuthController {
  static async login(req: CustomRequest<UserAuthDto>, res: Response) {
    try {
      const { email, password } = await validateRequest(UserAuthDto, req.body);

      const userRepo = appDataSource.getRepository(UserEntity);
      const user = await userRepo.findOneBy({
        email,
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

      const sessionKey = await LoginSessionController.addSession(user.id);
      if (!sessionKey) {
        console.error("Failed to create login session");
        throw new Error("Unknwon error");
      }

      console.info(`session added for user: ${user.id}`);

      const payload = { id: user.id, sessionKey };
      const secretKey = process.env.JWT_SECRET_KEY!;
      const token = sign(payload, secretKey, {
        expiresIn: "2hr",
      });

      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      if (error instanceof CustomError)
        return res.status(error.status).json({ message: error.customMessage });
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async register(req: CustomRequest<UserDetailsDto>, res: Response) {
    try {
      const { firstName, lastName, dateOfBirth, email, gender, password } =
        await validateRequest(UserDetailsDto, req.body);
      const userDetails = new UserEntity();
      userDetails.firstName = firstName;
      userDetails.lastName = lastName;
      userDetails.dateOfBirth = dateOfBirth;
      userDetails.password = password;
      userDetails.email = email;
      userDetails.gender = gender;

      const userRepo = appDataSource.getRepository(UserEntity);
      await userRepo.save(userDetails);

      res
        .status(StatusCodes.CREATED)
        .json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      if ((error as any).routine === "_bt_check_unique")
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ message: "Email is already registered." });
      if (error instanceof CustomError)
        return res.status(error.status).json({ message: error.customMessage });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
}
