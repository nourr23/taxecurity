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
import { GetUser } from 'src/store/auth/decorator';
import { JwtGuard } from 'src/store/auth/guard';
import { AlertService } from './alert.service';
import { CreateAlertDto, EditAlertDto } from './dto';

@Controller('alerts')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAlerts(@GetUser('id') userId: number) {
    return this.alertService.getAlerts(userId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getAlertById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.getAlertById(userId, alertId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createAlert(@GetUser('id') userId: number, @Body() dto: CreateAlertDto) {
    return this.alertService.createAlert(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateAlert(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
    @Body() dto: EditAlertDto,
  ) {
    return this.alertService.updateAlert(userId, alertId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeAlert(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) alertId: number,
  ) {
    return this.alertService.deleteAlert(userId, alertId);
  }
}
