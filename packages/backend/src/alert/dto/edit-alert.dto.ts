import { IsString, IsNotEmpty } from 'class-validator';

export class EditAlertDto {
  @IsString()
  @IsNotEmpty()
  status?: string;

  @IsString()
  @IsNotEmpty()
  type?: string;
}
