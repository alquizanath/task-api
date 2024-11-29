import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, IsIn, Min, Max } from "class-validator";
import { PaginationDto } from "./pagination.dto";

export class GetTaskFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @IsOptional()
  createdAt!: Date;
}
