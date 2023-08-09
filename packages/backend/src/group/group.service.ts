import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}
  // admin
  async getGroups() {
    try {
      const groups = await this.prisma.group.findMany({});
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
          OR: [
            {
              creatorId: userId,
            },
            // or admin
          ],
        },
      });
      return 'group deleted successfully';
    } catch (error) {
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
          creatorId: userId,
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
  //kick from group
}
