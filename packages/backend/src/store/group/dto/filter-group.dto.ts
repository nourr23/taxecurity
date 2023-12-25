import { IsOptional, IsString, IsBoolean } from 'class-validator';
export class FilteredGroupDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  group_admin?: string;

  // @IsBoolean()
  // @IsOptional()
  // active?: string;
}

export class PaginationGroupDto {
  @IsString()
  @IsOptional()
  top?: string;

  @IsString()
  @IsOptional()
  skip?: string;
}
