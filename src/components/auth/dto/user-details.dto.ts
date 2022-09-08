import { IsString, IsEmail, IsDate, IsIn } from "class-validator";
import { Transform } from "class-transformer";
import { gender } from "../../../constants/gender.constant";

export class UserDetailsDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsIn(gender)
  gender!: string;

  @IsDate({ message: "dateOfBirth must be a valid date" })
  @Transform(({ value }: { value: number | string | null }) => {
    if (value === null) return null;
    const dob = new Date(value);
    if (Number.isNaN(dob.valueOf())) throw "Invalid date of birth";
    return dob;
  })
  dateOfBirth!: Date;
}
