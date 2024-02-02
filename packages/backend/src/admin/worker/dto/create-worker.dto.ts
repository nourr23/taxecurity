import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Matches(/^\d{8}$/)
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
