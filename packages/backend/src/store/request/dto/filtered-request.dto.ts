import { IsEmail, IsOptional, IsString } from 'class-validator';
export class FilteredRequestsDto {
  @IsString()
  @IsOptional()
  sender?: string;

  @IsString()
  @IsOptional()
  receiver?: string;
}

export class PaginationRequestsDto {
  @IsString()
  @IsOptional()
  top?: string;

  @IsString()
  @IsOptional()
  skip?: string;
}
