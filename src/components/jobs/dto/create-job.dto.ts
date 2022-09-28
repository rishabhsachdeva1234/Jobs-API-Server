import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";
import { jobPositions } from "../../../constants/job-position.constant";
import { technologies } from "../../../constants/technologies.constant";

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  company!: string;

  @IsNotEmpty()
  @IsIn(jobPositions)
  position!: typeof jobPositions[number];

  @IsArray()
  @IsIn(technologies, { each: true })
  technologies!: Array<typeof technologies[number]>;

  @IsNotEmpty()
  @IsString()
  description!: string;
}
