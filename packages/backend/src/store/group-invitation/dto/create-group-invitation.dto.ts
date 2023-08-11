import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateGroupInvitationDto {
  @IsNumber()
  @IsNotEmpty()
  receiverId: number;

  @IsNumber()
  @IsNotEmpty()
  groupId: number;
}
