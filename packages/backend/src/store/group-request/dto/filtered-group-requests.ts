import { IsEmail, IsOptional, IsString } from 'class-validator';
export class FilteredGroupRequestsDto {
  @IsString()
  @IsOptional()
  sender?: string;

  @IsString()
  @IsOptional()
  creator?: string;

  @IsString()
  @IsOptional()
  group_name?: string;
}

export class PaginationGroupRequestsDto {
  @IsString()
  @IsOptional()
  top?: string;

  @IsString()
  @IsOptional()
  skip?: string;
}
