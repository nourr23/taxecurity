import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  Matches,
} from 'class-validator';

export class CreateInvitationDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  destination: string;
}
