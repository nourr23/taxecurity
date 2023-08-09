import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsBoolean()
  // active?: boolean;
}
