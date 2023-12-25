import { IsEmail, IsOptional, IsString } from 'class-validator';
export class FilteredUserDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class PaginationUserDto {
  @IsString()
  @IsOptional()
  top?: string;

  @IsString()
  @IsOptional()
  skip?: string;
}
