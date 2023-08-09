import { Module } from '@nestjs/common';
import { GroupInvitationService } from './group-invitation.service';
import { GroupInvitationController } from './group-invitation.controller';

@Module({
  providers: [GroupInvitationService],
  controllers: [GroupInvitationController]
})
export class GroupInvitationModule {}
