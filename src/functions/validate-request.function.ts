import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../classes/custom-error.class";

export async function validateRequest<T extends Object>(
  classInstance: new () => T,
  body: T
): Promise<T> {
  try {
    const transformedObj = plainToInstance(classInstance, body);
    await validateOrReject(transformedObj);
    return transformedObj;
  } catch (error) {
    const validationErrors = error as Array<ValidationError>;
    const errors = validationErrors.flatMap((err) =>
      Object.values(err.constraints ?? {})
    );
    throw new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, errors);
  }
}
