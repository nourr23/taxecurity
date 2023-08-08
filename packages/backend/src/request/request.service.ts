import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  async createRequest(senderId: number, receiverId: number) {
    try {
      const request = await this.prisma.request.create({
        data: {
          senderId: senderId,
          receiverId: receiverId,
        },
      });
      return request;
    } catch (error) {
      console.log({ error });
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'p2002')) {
          throw new ForbiddenException('Request already sent');
        }
      }
      throw error;
    }
  }

  async removeRequest(userId: number, destinationId: number) {
    try {
      if (destinationId) {
        await this.prisma.request.deleteMany({
          where: {
            receiverId: destinationId,
            senderId: userId,
          },
        });
        return 'request removed';
      }
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find request',
      });
    }
  }

  async declineRequest(userId: number, senderId: number) {
    try {
      if (senderId) {
        await this.prisma.request.deleteMany({
          where: {
            receiverId: userId,
            senderId: senderId,
          },
        });
        return 'request removed';
      }
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find request',
      });
    }
  }

  async getRequests() {
    try {
      const requests = await this.prisma.request.findMany({
        include: {
          // sender:true
        },
      });
      return requests;
    } catch (error) {}
  }

  async getRequestById(id: number) {
    try {
      // const request = await this.prisma.request.findMany({
      //   where: {
      //     id: id,
      //   },
      // });
      // return request;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find request',
      });
    }
  }
  async deleteRequest(id: number) {
    try {
      // const request = await this.prisma.request.delete({
      //   where: {
      //     id: id,
      //   },
      // });
      // return request;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find request',
      });
    }
  }
}
