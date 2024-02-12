import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class FilterWorkerInvitationsDto {
  @IsString()
  @IsOptional()
  destination?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  sentBy?: string;
}

export class PaginationWorkerInvitationsDto {
  @IsString()
  @IsOptional()
  top?: string;

  @IsString()
  @IsOptional()
  skip?: string;
}
