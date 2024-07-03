import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Post,
  ParseIntPipe,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Admin } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { HasRole } from 'src/auth/decorator/has-role.decorator';
import { Role } from 'src/auth/enums';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { CreateWorkerDto, UpdateWorkerDto } from './dto';
import { WorkerService } from './worker.service';

@Controller('admin/workers')
export class WorkerController {
  constructor(private workerService: WorkerService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Get('me')
  getMe(@GetUser() admin: Admin) {
    return admin;
  }

  //create a worker
  @Post()
  createWorker(@Body() dto: CreateWorkerDto) {
    return this.workerService.createWorker(dto);
  }

  //get all workers
  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Get('')
  getAllWorkers(@GetUser() admin: Admin) {
    return this.workerService.getWorkers(admin);
  }

  //get worker by id
  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Get(':id')
  getAllWorkerById(
    @GetUser() admin: Admin,
    @Param('id', ParseIntPipe) workerId: number,
  ) {
    return this.workerService.getWorkerById(admin, workerId);
  }
  //edit workers
  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Patch(':id')
  updateWorker(
    @GetUser() admin: Admin,
    @Param('id', ParseIntPipe) workerId: number,
    @Body() dto: UpdateWorkerDto,
  ) {
    return this.workerService.updateWorker(admin, workerId, dto);
  }

  //maybe delete
  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Delete(':id')
  deleteWorker(
    @GetUser() admin: Admin,
    @Param('id', ParseIntPipe) workerId: number,
  ) {
    return this.workerService.deleteWorker(admin, workerId);
  }

  //don't forget to test if the worker is active after login auth service
}
