import { Response } from "express";
import { CustomRequest } from "../../interfaces/common-interface";
import { LoginRequest } from "../auth/request-interfaces/login-request.interface";
import { RegisterRequest } from "../auth/request-interfaces/register-request.interface";
import { StatusCodes } from "http-status-codes";

export class JobsController {
  static async getAllJobs(req: CustomRequest<LoginRequest>, res: Response) {
    try {
      return res.status(StatusCodes.OK).send(req.user);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  static async getJob(req: CustomRequest<RegisterRequest>, res: Response) {
    try {
      return res.status(StatusCodes.OK).send("get single jobs route");
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  static async createJob(req: CustomRequest<RegisterRequest>, res: Response) {
    try {
      return res.status(StatusCodes.CREATED).send("create jobs route");
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  static async updateJob(req: CustomRequest<RegisterRequest>, res: Response) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  static async deleteJob(req: CustomRequest<RegisterRequest>, res: Response) {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
}
