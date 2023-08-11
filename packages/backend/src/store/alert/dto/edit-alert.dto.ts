import { IsString, IsNotEmpty } from 'class-validator';

export class EditAlertDto {
  status?: string;

  type?: string;
}
