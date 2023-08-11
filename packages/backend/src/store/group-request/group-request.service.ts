import {
  Injectable,
  NotFoundException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateGroupRequestDto } from './dto';
import { GroupService } from 'src/store/group/group.service';

@Injectable()
export class GroupRequestService {
  constructor(
    private prisma: PrismaService,
    private groupService: GroupService,
  ) {}

  async getRequests() {
    try {
      const requests = await this.prisma.groupRequest.findMany({});
      return requests;
    } catch (error) {
      console.log(error);
    }
  }

  async getRequestById(userId: number, requestId: number) {
    try {
      const request = await this.prisma.groupRequest.findUnique({
        where: {
          id: requestId,
        },
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone_number: true,
              taxi_number: true,
            },
          },
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone_number: true,
              taxi_number: true,
            },
          },
          Group: true,
        },
      });
      return request;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find request',
      });
    }
  }

  async createGroupRequest(userId: number, dto: CreateGroupRequestDto) {
    try {
      const creator = await this.prisma.user.findUnique({
        where: {
          id: dto.creatorId,
        },
      });
      const group = await this.prisma.group.findUnique({
        where: {
          id: dto.groupId,
        },
      });
      if (creator && group && group.creatorId === dto.creatorId) {
        const groupRequest = await this.prisma.groupRequest.create({
          data: {
            creatorId: dto.creatorId,
            groupId: dto.groupId,
            senderId: userId,
          },
        });
        return groupRequest;
      } else if (!creator) {
        return new ForbiddenException('Cannot find admin');
      } else if (!group) {
        return new ForbiddenException('Cannot find the group');
      } else {
        return new ForbiddenException('Cannot send this request');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'p2002')) {
          throw new ForbiddenException('Request already sent');
        }
      }
    }
  }

  async removeRequest(userId: number, requestId: number) {
    try {
      await this.prisma.groupRequest.delete({
        where: {
          id: requestId,
          senderId: userId,
        },
      });
      return 'request has been deleted';
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find request',
      });
    }
  }

  async declineRequest(userId: number, requestId: number) {
    try {
      await this.prisma.groupRequest.delete({
        where: {
          id: requestId,
          creatorId: userId,
        },
      });
      return 'request removed';
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find request',
      });
    }
  }

  async acceptGroupRequest(userId: number, requestId: number) {
    try {
      const groupRequest = await this.prisma.groupRequest.findUnique({
        where: {
          id: requestId,
          creatorId: userId,
        },
      });
      if (groupRequest) {
        const senderId = groupRequest.senderId;
        const groupId = groupRequest.groupId;
        await this.prisma.groupRequest.delete({
          where: {
            id: requestId,
          },
        });
        return await this.groupService.acceptRequest(userId, senderId, groupId);
      } else {
        return new ForbiddenException('Cannot find the request');
      }
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find request',
      });
    }
  }
}
