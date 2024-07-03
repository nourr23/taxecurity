import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AlertService } from './alert.service';
import { CreateAlertDto, EditAlertDto } from './dto';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/enums';
import { HasRole } from 'src/auth/decorator/has-role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('alerts')
export class AlertController {
  constructor(private alertService: AlertService) {}

  // both roles can get alerts
  @Get()
  getAlerts(@GetUser('id') userId: number) {
    return this.alertService.getAlerts(userId);
  }
  // both roles can get alerts by id
  @Get(':id')
  getAlertById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.getAlertById(userId, alertId);
  }
  @HasRole(Role.Driver)
  @Post()
  createAlert(@GetUser('id') userId: number, @Body() dto: CreateAlertDto) {
    return this.alertService.createAlert(userId, dto);
  }

  // both roles can edit the alert
  @Patch(':id')
  updateAlert(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
    @Body() dto: EditAlertDto,
  ) {
    return this.alertService.updateAlert(userId, alertId, dto);
  }

  @HasRole(Role.Driver)
  @Delete(':id')
  removeAlert(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.deleteAlert(userId, alertId);
  }
}
