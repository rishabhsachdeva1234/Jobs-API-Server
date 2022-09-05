import { Request } from "express";

export interface CustomRequest<T> extends Request {
  user?: JWTVerifiedUser;
  body: T;
}

export interface PaginationRequest {
  pageIndex: number;
  pageSize: number;
}

export interface JWTVerifiedUser {
  id: string;
  email: string;
}
