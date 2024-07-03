import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class signUpDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$/)
  phone: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class createAdminDto {
  @IsEmail()
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
}

export class signInDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
