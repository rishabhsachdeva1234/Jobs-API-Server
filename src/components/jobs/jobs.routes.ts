import { Router } from "express";
import { validateToken } from "../../middlewares/validate-token";
import { JobsController } from "./jobs.controller";

export const jobsRouter: Router = Router();

jobsRouter
  .route("/")
  .get(validateToken, JobsController.getAllJobs)
  .post(JobsController.createJob);

jobsRouter
  .route("/:id")
  .get(JobsController.getJob)
  .patch(JobsController.updateJob)
  .delete(JobsController.deleteJob);
