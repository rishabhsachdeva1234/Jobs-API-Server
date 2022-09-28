import { Response } from "express";
import { CustomRequest } from "../../interfaces/common-interface";
import { LoginRequest } from "../auth/request-interfaces/login-request.interface";
import { RegisterRequest } from "../auth/request-interfaces/register-request.interface";
import { StatusCodes } from "http-status-codes";
import { CreateJobDto } from "./dto/create-job.dto";
import { validateRequest } from "../../functions/validate-request.function";
import { JobsEntity } from "./entity/jobs.entity";
import { appDataSource } from "../../data-source";
import { CustomError } from "../../classes/custom-error.class";
import { UserEntity } from "../auth/entity/user.entity";

export class JobsController {
  static async getAllJobs(req: CustomRequest<LoginRequest>, res: Response) {
    try {
      const jobsRepo = appDataSource.getRepository(JobsEntity);
      const [jobs, count] = await jobsRepo.findAndCount({
        select: ["id", "company", "position", "createdAt"],
        where: {
          createdBy: req.user?.id,
        },
      });
      return res.status(StatusCodes.OK).json({ count, jobs });
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

  static async createJob(req: CustomRequest<CreateJobDto>, res: Response) {
    try {
      const { user: userDetails } = req;
      const { company, position, technologies, description } =
        await validateRequest(CreateJobDto, req.body);
      const jobsRepo = appDataSource.getRepository(JobsEntity);
      await jobsRepo.save({
        user: userDetails,
        company,
        position: position,
        technologies: technologies.join(","),
        description,
      });
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "Job listed successfully!" });
    } catch (error) {
      console.error(error);

      if (error instanceof CustomError)
        return res.status(error.status).json({ message: error.customMessage });
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
      if (error instanceof CustomError)
        return res.status(error.status).json({ message: error.customMessage });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
}
