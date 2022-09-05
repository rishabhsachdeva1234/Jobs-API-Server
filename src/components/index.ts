import { Router } from "express";
import { RoutesEnum } from "../enums/routes.enum";
import { authRouter } from "./auth/auth.routes";
import { jobsRouter } from "./jobs/jobs.routes";

export const restRouter: Router = Router();

restRouter.use(RoutesEnum.auth, authRouter);
restRouter.use(RoutesEnum.jobs, jobsRouter);
