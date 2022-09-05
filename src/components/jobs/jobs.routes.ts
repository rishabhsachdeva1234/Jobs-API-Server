import { Router } from "express";
import { JobsController } from "./jobs.controller";

export const jobsRouter: Router = Router();

jobsRouter
  .route("/")
  .get(JobsController.getAllJobs)
  .post(JobsController.createJob);

jobsRouter
  .route("/:id")
  .get(JobsController.getJob)
  .patch(JobsController.updateJob)
  .delete(JobsController.deleteJob);
