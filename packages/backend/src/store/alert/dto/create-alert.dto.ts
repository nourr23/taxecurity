import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
