import { Module } from '@nestjs/common';
import { GroupRequestService } from './group-request.service';
import { GroupRequestController } from './group-request.controller';
import { GroupService } from 'src/store/group/group.service';

@Module({
  providers: [GroupRequestService, GroupService],
  controllers: [GroupRequestController],
})
export class GroupRequestModule {}
