import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateGroupRequestDto {
  @IsNumber()
  @IsNotEmpty()
  creatorId: number;

  @IsNumber()
  @IsNotEmpty()
  groupId: number;
}
