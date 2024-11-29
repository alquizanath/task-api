import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../types';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status!: TaskStatusEnum;
}
