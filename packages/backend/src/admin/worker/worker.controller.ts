import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { HasRole } from 'src/auth/decorator/has-role.decorator';
import { Role } from 'src/auth/enums';
import { RolesGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('admin/workers')
export class WorkerController {
  @HasRole(Role.Admin)
  @Get('me')
  getMe(@GetUser() admin: Admin) {
    return admin;
  }
}
