import { EnvConstants } from "../constants/env.constants";

const validate = function <T, K extends keyof T>(
  obj: Partial<T>,
  prop: K,
  msg?: string
) {
  if (obj[prop] === undefined || obj[prop] === null) {
    throw new Error(msg || `Environment is missing variable: ${String(prop)}`);
  }
};

export async function validateEnv() {
  EnvConstants.forEach((constant) => validate(process.env, constant));
  return true;
}
