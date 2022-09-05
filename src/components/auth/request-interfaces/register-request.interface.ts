import { LoginRequest } from "./login-request.interface";

export interface RegisterRequest extends LoginRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}
