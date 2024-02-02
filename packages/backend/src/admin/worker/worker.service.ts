import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkerDto, UpdateWorkerDto } from './dto';
import * as argon from 'argon2';
import { Admin } from '@prisma/client';

@Injectable()
export class WorkerService {
  constructor(private prisma: PrismaService) {}

  async createWorker(dto: CreateWorkerDto) {
    try {
      const emailToLowerCase = dto.email.toLowerCase();
      const invitation = await this.prisma.workersInvitations.findUnique({
        where: {
          destination: emailToLowerCase,
          rakmSerri: dto.code,
          status: 'accepted',
        },
      });
      if (!invitation) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find candidate',
        });
      } else {
        const hash = await argon.hash(dto.password);
        const worker = await this.prisma.admin.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            phone: dto.phone,
            email: emailToLowerCase,
            status: 'pending',
            type: 'worker',
            hash,
          },
        });

        const updateInvitation = await this.prisma.workersInvitations.update({
          where: {
            destination: emailToLowerCase,
            rakmSerri: dto.code,
            status: 'accepted',
          },
          data: {
            status: 'worker',
          },
        });

        return worker;
      }
    } catch (error) {
      throw error;
    }
  }
  async getWorkers(admin: Admin) {
    try {
      if (admin.type != 'super') {
        throw new NotFoundException({
          status: HttpStatus.FORBIDDEN,
          error: 'Authorization denied',
        });
      }
      const workers = await this.prisma.admin.findMany({
        where: {
          type: 'worker',
        },
      });
      return workers;
    } catch (error) {
      throw error;
    }
  }
  async getWorkerById(admin: Admin, workerId: number) {
    try {
      if (admin.type != 'super') {
        throw new NotFoundException({
          status: HttpStatus.FORBIDDEN,
          error: 'Authorization denied',
        });
      }
      const worker = await this.prisma.admin.findUnique({
        where: {
          id: workerId,
          type: 'worker',
        },
      });
      return worker;
    } catch (error) {
      throw error;
    }
  }
  async updateWorker(admin: Admin, workerId: number, dto: UpdateWorkerDto) {
    try {
      if (admin.type != 'super') {
        throw new NotFoundException({
          status: HttpStatus.FORBIDDEN,
          error: 'Authorization denied',
        });
      }
      const worker = await this.prisma.admin.update({
        where: {
          id: workerId,
          type: 'worker',
        },
        data: {
          status: dto.status,
          type: dto.type,
        },
      });
      return worker;
    } catch (error) {
      throw error;
    }
  }
  async deleteWorker(admin: Admin, workerId: number) {
    try {
      if (admin.type != 'super') {
        throw new NotFoundException({
          status: HttpStatus.FORBIDDEN,
          error: 'Authorization denied',
        });
      }
      const worker = await this.prisma.admin.delete({
        where: {
          id: workerId,
          type: 'worker',
        },
      });
      return 'worker deleted';
    } catch (error) {
      throw error;
    }
  }
}
