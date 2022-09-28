import { Router } from "express";
import { validateToken } from "../../middlewares/validate-token";
import { validateUserRole } from "../../middlewares/validate-user-role.middleware";
import { JobsController } from "./jobs.controller";

export const jobsRouter: Router = Router();

jobsRouter.route("/").get(JobsController.getAllJobs);

jobsRouter
  .route("/recruiter")
  .get(validateToken, validateUserRole("Recruiter"), JobsController.getAllJobs)
  .post(validateToken, validateUserRole("Recruiter"), JobsController.createJob);

jobsRouter
  .route("/:id")
  .get(JobsController.getJob)
  .patch(JobsController.updateJob)
  .delete(JobsController.deleteJob);
