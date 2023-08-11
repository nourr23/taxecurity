import { Module } from '@nestjs/common';
import { GroupInvitationService } from './group-invitation.service';
import { GroupInvitationController } from './group-invitation.controller';
import { GroupService } from 'src/store/group/group.service';

@Module({
  providers: [GroupInvitationService, GroupService],
  controllers: [GroupInvitationController]
})
export class GroupInvitationModule {}
