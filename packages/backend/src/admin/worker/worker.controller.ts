import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { Request } from 'express';
import { GetAdmin } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@Controller('admin/workers')
export class WorkerController {

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetAdmin() admin:Admin){
    return admin
  }
}
