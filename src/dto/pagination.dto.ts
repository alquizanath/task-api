import { Type } from "class-transformer";
import { IsOptional, IsInt, Min, IsIn, IsString } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageIndex?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  // @IsOptional()
  // @IsString()
  // sortBy?: string;

  // @IsOptional()
  // @IsIn(["asc", "desc"])
  // sortOrder?: "asc" | "desc";
}
