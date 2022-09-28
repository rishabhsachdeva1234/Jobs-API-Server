import { Request, Response } from "express";
import { jobPositions } from "../../constants/job-position.constant";
import { technologies } from "../../constants/technologies.constant";
import { userRoles } from "../../constants/user-roles.constant";

export class SharedDataController {
  static async getJobPositions(req: Request, res: Response) {
    try {
      return res.status(200).send(jobPositions);
    } catch (error) {
      return res.status(500).send({ message: "Internal server error." });
    }
  }
  static async getUserRoles(req: Request, res: Response) {
    try {
      return res.status(200).send(userRoles);
    } catch (error) {
      return res.status(500).send({ message: "Internal server error." });
    }
  }
  static async getTechnologies(req: Request, res: Response) {
    try {
      return res.status(200).send(technologies);
    } catch (error) {
      return res.status(500).send({ message: "Internal server error." });
    }
  }
}
