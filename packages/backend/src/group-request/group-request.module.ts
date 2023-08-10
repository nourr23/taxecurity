import { Module } from '@nestjs/common';
import { GroupRequestService } from './group-request.service';
import { GroupRequestController } from './group-request.controller';

@Module({
  providers: [GroupRequestService],
  controllers: [GroupRequestController]
})
export class GroupRequestModule {}
