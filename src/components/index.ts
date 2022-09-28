import { Router } from "express";
import { RoutesEnum } from "../enums/routes.enum";
import { authRouter } from "./auth/auth.routes";
import { jobsRouter } from "./jobs/jobs.routes";
import { sharedRouter } from "./shared-data/shared-data.routes";

export const restRouter: Router = Router();

restRouter.use(RoutesEnum.auth, authRouter);
restRouter.use(RoutesEnum.jobs, jobsRouter);
restRouter.use(RoutesEnum.shared, sharedRouter);
