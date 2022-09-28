import { Router } from "express";
import { SharedDataController } from "./shared-data.controller";

export const sharedRouter = Router();

sharedRouter.get("/job-positions", SharedDataController.getJobPositions);

sharedRouter.get("/user-roles", SharedDataController.getUserRoles);

sharedRouter.get("/technologies", SharedDataController.getTechnologies);
