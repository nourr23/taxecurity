import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateInvitationDto } from './dto';

@Injectable()
export class InvitationsService {
  constructor(private prisma: PrismaService) {}

  async getInvitations() {
    try {
      const request = await this.prisma.workersInvitations.findMany({});
      return request;
    } catch (error) {}
  }

  async createInvitation(userId: number, dto: CreateInvitationDto) {
    try {
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

        const existing = await this.prisma.workersInvitations.findUnique({
          where: {
            destination: dto.destination,
          },
        });
        if (existing) {
          throw new ForbiddenException('Credentials taken');
        } else {
          const invitation = this.prisma.workersInvitations.create({
            data: {
              destination: dto.destination,
              status: 'pending',
              rakmSerri: randomCode,
              sentBy: {
                connect: super_admin,
              },
            },
          });
          return invitation;
        }
      }
    } catch (error) {}
  }

  async checkInvitation(code: string, destination: string) {
    try {
      const invitation = await this.prisma.workersInvitations.findUnique({
        where: {
          destination: destination,
        },
      });
      if (!invitation) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find invitation',
        });
      }
      if (invitation.rakmSerri == code && invitation.status == '') {
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
