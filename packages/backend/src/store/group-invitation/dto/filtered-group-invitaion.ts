import { IsEmail, IsOptional, IsString } from 'class-validator';
export class FilteredGroupInvitationsDto {
  @IsString()
  @IsOptional()
  receiver?: string;

  @IsString()
  @IsOptional()
  creator?: string;

  @IsString()
  @IsOptional()
  group_name?: string;
}

export class PaginationGroupInvitationsDto {
  @IsString()
  @IsOptional()
  top?: string;

  @IsString()
  @IsOptional()
  skip?: string;
}
