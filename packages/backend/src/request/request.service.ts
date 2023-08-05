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

  async createRequest(senderId, receiverId) {
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

  async removeRequest(userId, destinationId) {
    try {
      await this.prisma.request.deleteMany({
        where: {
          receiverId: destinationId,
          senderId: userId,
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
}
