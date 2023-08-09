import {
  Injectable,
  NotFoundException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupInvitationDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GroupInvitationService {
  constructor(private prisma: PrismaService) {}

  async getAllInvitations() {
    try {
      const invitations = await this.prisma.groupInvitation.findMany({});
      return invitations;
    } catch (error) {
      console.log(error);
    }
  }

  async getInvitationById(userId: number, invitationId: number) {
    try {
      const invitation = await this.prisma.groupInvitation.findUnique({
        where: {
          id: invitationId,
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
          receiver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone_number: true,
              taxi_number: true,
            },
          },
          group: true,
        },
      });
      return invitation;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find invitation',
      });
    }
  }

  async createGroupInvitation(userId: number, dto: CreateGroupInvitationDto) {
    try {
      const receiver = await this.prisma.user.findUnique({
        where: {
          id: dto.receiverId,
        },
      });
      const group = await this.prisma.group.findUnique({
        where: {
          id: dto.groupId,
        },
      });
      if (receiver && group && group.creatorId === userId) {
        const groupInvitation = await this.prisma.groupInvitation.create({
          data: {
            creatorId: userId,
            receiverId: dto.receiverId,
            groupId: dto.groupId,
          },
        });
        return groupInvitation;
      } else if (!receiver) {
        return new ForbiddenException('Cannot find user');
      } else if (!group) {
        return new ForbiddenException('Cannot find the group');
      } else {
        return new ForbiddenException('Cannot add user to the group');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'p2002')) {
          throw new ForbiddenException('Invitation already sent');
        }
      }
    }
  }

  async removeInvitation(userId: number, invitationId: number) {
    try {
      await this.prisma.groupInvitation.delete({
        where: {
          id: invitationId,
          creatorId: userId,
        },
      });
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find invitation',
      });
    }
  }

  async declineInvitation(userId: number, invitationId: number) {
    try {
      await this.prisma.groupInvitation.delete({
        where: {
          id: invitationId,
          receiverId: userId,
        },
      });
      return 'invitation removed';
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find invitation',
      });
    }
  }
}
