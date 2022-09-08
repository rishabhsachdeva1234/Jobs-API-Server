import { IsString, IsNotEmpty } from "class-validator";

export class UserAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  readonly password!: string;
}
