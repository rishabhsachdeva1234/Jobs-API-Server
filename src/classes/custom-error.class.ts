export class CustomError extends Error {
  public status: number;
  public customMessage: string | string[];
  constructor(
    status: number,
    message: string | string[] = "Invalid Paramters"
  ) {
    super(message[0] ?? "Invalid Parameters");
    this.status = status;
    this.customMessage = message;
  }
}
