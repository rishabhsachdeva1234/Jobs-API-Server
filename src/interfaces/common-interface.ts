import { Request } from "express";

export interface CustomRequest<T> extends Request {
  user?: { id: string };
  body: T;
}

export interface PaginationRequest {
  pageIndex: number;
  pageSize: number;
}

export interface JWTTokenData {
  id: string;
  sessionKey: string;
}
