import { IsNotEmpty, IsEnum } from "class-validator";
import { TaskStatusEnum } from "../types/enums";

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  status!: TaskStatusEnum;
}
