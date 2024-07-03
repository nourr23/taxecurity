import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateWorkerDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  type?: string;
}
