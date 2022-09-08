import { LoginRequest } from "./login-request.interface";

export interface RegisterRequest extends LoginRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dateOfBirth: string;
  gender: string;
}
