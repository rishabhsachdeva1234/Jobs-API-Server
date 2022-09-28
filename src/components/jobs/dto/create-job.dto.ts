import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";
import { job_position } from "../../../constants/job-position.constant";
import { technologies } from "../../../constants/technologies.constant";

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  company!: string;

  @IsNotEmpty()
  @IsIn(job_position)
  position!: typeof job_position[number];

  @IsArray()
  @IsIn(technologies, { each: true })
  technologies!: Array<typeof technologies[number]>;

  @IsNotEmpty()
  @IsString()
  description!: string;
}
