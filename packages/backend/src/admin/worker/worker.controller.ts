import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('admin/workers')
export class WorkerController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() admin: Admin) {
    return admin;
  }
}
