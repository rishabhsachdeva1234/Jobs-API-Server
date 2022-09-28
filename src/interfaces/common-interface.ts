import { Request } from "express";
import { userRoles } from "../constants/user-roles.constant";

export interface CustomRequest<T> extends Request {
  user?: JWTTokenData;
  body: T;
}

export interface PaginationRequest {
  pageIndex: number;
  pageSize: number;
}

export interface JWTTokenData {
  id: string;
  sessionKey: string;
  role: typeof userRoles[number];
}
