import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber } from "class-validator";
import { TaskStatusEnum } from "../types/enums";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  id?: number;
}
