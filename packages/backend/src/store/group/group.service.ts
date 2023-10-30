import {
  Injectable,
  NotFoundException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}
  // admin
  async getGroups() {
    try {
      const groups = await this.prisma.group.findMany({
        include: {
          creator: true,
          users: true,
        },
      });
      return groups;
    } catch (error) {
      console.log(error);
    }
  }

  async getGroupById(groupId: number) {
    try {
      const group = await this.prisma.group.findUnique({
        where: {
          id: groupId,
        },
        include: {
          creator: {
            select: {
              id: true,
              lastName: true,
              firstName: true,
              phone_number: true,
              taxi_number: true,
              email: true,
            },
          },
          users: {
            select: {
              id: true,
              lastName: true,
              firstName: true,
              phone_number: true,
              taxi_number: true,
              email: true,
            },
          },
        },
      });
      return group;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find group',
      });
    }
  }

  async deleteGroup(groupId: number, userId: number) {
    try {
      await this.prisma.group.delete({
        where: {
          id: groupId,
          // OR: [
          //   {
          //     creatorId: userId,
          //   },
          //   // or admin
          // ],
        },
      });
      return 'group deleted successfully';
    } catch (error) {
      console.log(error);
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find group',
      });
    }
  }

  async updateGroup(groupId: number, userId: number, dto: UpdateGroupDto) {
    try {
      const group = await this.prisma.group.update({
        where: {
          id: groupId,
          // creatorId: userId, creator or admin
        },
        data: {
          ...dto,
        },
      });
      return group;
    } catch (error) {
      console.log({ error });
    }
  }

  // users
  async createGroup(dto: CreateGroupDto, userId: number) {
    try {
      const creator = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (creator) {
        const group = await this.prisma.group.create({
          data: {
            creatorId: userId,
            name: dto.name,
            active: true,
            users: {
              connect: creator,
            },
          },
        });
        return group;
      }
    } catch (error) {}
  }

  //get my groups
  //leave group
  async leaveGroup(userId: number, groupId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user) {
        const group = await this.prisma.group.update({
          where: {
            id: groupId,
            NOT: { creatorId: userId },
          },
          data: {
            users: {
              disconnect: user,
            },
          },
        });
        return user;
      } else {
        return new ForbiddenException('Cannot find user');
      }
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find group',
      });
    }
  }
  //kick from group
  async kickUserFromGroup(userId: number, groupId: number, targetId: number) {
    try {
      const target = await this.prisma.user.findUnique({
        where: {
          id: targetId,
        },
      });
      // console.log({ targetId }, target);
      if (target) {
        const group = await this.prisma.group.update({
          where: {
            id: groupId,
            creatorId: userId,
          },
          data: {
            users: { disconnect: target },
          },
        });
        return group;
      } else {
        return new ForbiddenException('Cannot find user');
      }
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find group',
      });
    }
  }
  //accept invitation
  async acceptInvitation(userId: number, creatorId: number, groupId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (user) {
        const group = await this.prisma.group.update({
          where: {
            id: groupId,
            creatorId: creatorId,
          },
          data: {
            users: {
              connect: user,
            },
          },
        });
        return group;
      } else {
        return new ForbiddenException('Cannot find user');
      }
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find group',
      });
    }
  }
  //accept request
  async acceptRequest(userId: number, senderId: number, groupId: number) {
    try {
      const sender = await this.prisma.user.findUnique({
        where: {
          id: senderId,
        },
      });
      if (sender) {
        const group = await this.prisma.group.update({
          where: {
            id: groupId,
            creatorId: userId,
          },
          data: {
            users: {
              connect: sender,
            },
          },
        });
        return group;
      } else {
        return new ForbiddenException('Cannot find user');
      }
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find group',
      });
    }
  }
}
