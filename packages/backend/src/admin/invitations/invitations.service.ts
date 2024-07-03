import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  CreateInvitationDto,
  FilterWorkerInvitationsDto,
  PaginationWorkerInvitationsDto,
} from './dto';

@Injectable()
export class InvitationsService {
  constructor(private prisma: PrismaService) {}

  async getInvitations(
    paginationWorkerInvitationDto: PaginationWorkerInvitationsDto,
  ) {
    try {
      const request = await this.prisma.workersInvitations.findMany({
        take: Number(paginationWorkerInvitationDto.top)
          ? Number(paginationWorkerInvitationDto.top)
          : 10,
        skip: Number(paginationWorkerInvitationDto.skip)
          ? Number(paginationWorkerInvitationDto.skip)
          : 0,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          destination: true,
          status: true,
          sentBy: {
            select: { firstName: true, lastName: true },
          },
        },
      });
      return request;
    } catch (error) {}
  }

  async getFilteredWorkerInvitations(
    filterWorkerInvitationsDto: FilterWorkerInvitationsDto,
    paginationWorkerInvitationDto: PaginationWorkerInvitationsDto,
  ) {
    try {
      const request = await this.prisma.workersInvitations.findMany({
        take: Number(paginationWorkerInvitationDto.top)
          ? Number(paginationWorkerInvitationDto.top)
          : 10,
        skip: Number(paginationWorkerInvitationDto.skip)
          ? Number(paginationWorkerInvitationDto.skip)
          : 0,
        where: {
          OR: [
            {
              status: {
                contains: filterWorkerInvitationsDto.status,
                mode: 'insensitive',
              },
            },
            {
              destination: {
                contains: filterWorkerInvitationsDto.destination,
                mode: 'insensitive',
              },
            },
            {
              sentBy: {
                lastName: {
                  contains: filterWorkerInvitationsDto.sentBy,
                  mode: 'insensitive',
                },
              },
            },
            {
              sentBy: {
                firstName: {
                  contains: filterWorkerInvitationsDto.sentBy,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          destination: true,
          status: true,
          sentBy: {
            select: { firstName: true, lastName: true },
          },
        },
      });
      return request;
    } catch (error) {}
  }

  async createInvitation(userId: number, dto: CreateInvitationDto) {
    try {
      // dto.destination.toLowerCase();
      const super_admin = await this.prisma.admin.findUnique({
        where: {
          id: userId,
        },
      });
      if (super_admin && super_admin.type === 'super') {
        let randomCode = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 6) {
          randomCode += characters.charAt(
            Math.floor(Math.random() * charactersLength),
          );
          counter += 1;
        }
        const emailToLowerCase = dto.destination.toLowerCase();
        const existing = await this.prisma.workersInvitations.findUnique({
          where: {
            destination: emailToLowerCase,
          },
        });
        if (existing) {
          throw new ForbiddenException('Credentials taken');
        } else {
          const invitation = this.prisma.workersInvitations.create({
            data: {
              destination: emailToLowerCase,
              status: 'pending',
              rakmSerri: randomCode,
              sentBy: {
                connect: super_admin,
              },
            },
          });
          return invitation;
        }
      } else {
        throw new NotFoundException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async checkInvitation(code: string, destination: string) {
    try {
      const emailToLowerCase = destination.toLowerCase();
      const invitation = await this.prisma.workersInvitations.findUnique({
        where: {
          destination: emailToLowerCase,
        },
      });
      if (!invitation) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find invitation',
        });
      }
      if (invitation.rakmSerri == code && invitation.status == 'pending') {
        // maybe only 3 tries then block
        const acceptInvitation = this.prisma.workersInvitations.update({
          where: { id: invitation.id },
          data: { status: 'accepted' },
        });
        return acceptInvitation;
      } else {
        return; // to refactor and get Adam's review
      }
    } catch (error) {
      throw error;
    }
  }

  async cancelInvitation(userId: number, invitationId: number) {
    try {
      const super_admin = await this.prisma.admin.findUnique({
        where: {
          id: userId,
        },
      });
      if (super_admin.type === 'super') {
        const invitation = await this.prisma.workersInvitations.update({
          where: {
            id: invitationId,
          },
          data: { status: 'canceled' },
        });
        return invitation;
      }
    } catch (error) {
      throw error;
    }
  }

  async getInvitationById(invitationId: number) {
    try {
      const invitation = await this.prisma.workersInvitations.findUnique({
        where: {
          id: invitationId,
        },
      });
      return invitation;
    } catch (error) {
      throw error;
    }
  }

  async deleteInvitation(userId: number, invitationId: number) {
    try {
      const super_admin = await this.prisma.admin.findUnique({
        where: {
          id: userId,
        },
      });
      if (super_admin.type === 'super') {
        await this.prisma.workersInvitations.delete({
          where: {
            id: invitationId,
          },
        });
        return 'Invitation deleted successfully';
      }
    } catch (error) {}
  }
}
