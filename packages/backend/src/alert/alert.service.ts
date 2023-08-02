import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateAlertDto, EditAlertDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) {}
  async getAlerts(userId: number) {
    try {
      const alerts = await this.prisma.alert.findMany({
        where: {
          userId: userId,
        },
      });
      return alerts;
    } catch (error) {}
  }
  async getAlertById(userId: number, alertId: number) {
    try {
      const alert = await this.prisma.alert.findUnique({
        where: {
          id: alertId,
        },
      });
      if (!alert) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Could not find alert',
        });
      }
      return alert;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find alert',
      });
    }
  }
  async createAlert(userId: number, dto: CreateAlertDto) {
    try {
      const hasDangerAlert = await this.prisma.alert.findFirst({
        where: {
          userId: userId,
          status: dto.status,
          type: dto.type,
        },
      });
      if (hasDangerAlert) {
        return hasDangerAlert;
      }
      const alert = await this.prisma.alert.create({
        data: {
          userId: userId,
          ...dto,
        },
      });
      return alert;
    } catch (error) {}
  }
  async updateAlert(userId: number, alertId: number, dto: EditAlertDto) {
    try {
      const alert = await this.prisma.alert.update({
        where: {
          userId: userId,
          id: alertId,
        },
        data: {
          ...dto,
        },
      });
      return alert;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find alert',
      });
    }
  }
  async deleteAlert(userId: number, alertId: number) {
    try {
      const alert = await this.prisma.alert.delete({
        where: {
          id: alertId,
          userId: userId,
        },
      });
      return alert;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find alert',
      });
    }
  }
}
