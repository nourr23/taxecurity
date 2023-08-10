import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class UpdateGroupDto {
  @IsString()
  name?: string;

  @IsBoolean()
  active?: boolean;
}
