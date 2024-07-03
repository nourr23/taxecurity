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
  Query,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Admin } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { HasRole } from 'src/auth/decorator/has-role.decorator';
import { Role } from 'src/auth/enums';
import { RolesGuard } from 'src/auth/guard/role.guard';
import {
  CreateInvitationDto,
  FilterWorkerInvitationsDto,
  PaginationWorkerInvitationsDto,
} from './dto';

@Controller('workers/invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Get()
  getAllInvitations(
    @Query() paginationWorkerInvitationDto: PaginationWorkerInvitationsDto,
  ) {
    return this.invitationsService.getInvitations(
      paginationWorkerInvitationDto,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Get('filtered')
  getFilteredWorkerInvitations(
    @Query() filterWorkerInvitationsDto: FilterWorkerInvitationsDto,
    @Query() paginationWorkerInvitationDto: PaginationWorkerInvitationsDto,
  ) {
    if (Object.keys(filterWorkerInvitationsDto).length) {
      return this.invitationsService.getFilteredWorkerInvitations(
        filterWorkerInvitationsDto,
        paginationWorkerInvitationDto,
      );
    } else
      return this.invitationsService.getInvitations(
        paginationWorkerInvitationDto,
      );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Post()
  createInvitation(
    @GetUser('id') userId: number,
    @Body() dto: CreateInvitationDto,
  ) {
    return this.invitationsService.createInvitation(userId, dto);
  }

  @Post('/accept')
  checkInvitation(
    @Body('code') code: string,
    @Body('destination') destination: string,
  ) {
    return this.invitationsService.checkInvitation(code, destination);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Patch('cancel/:id')
  cancelInvitation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invitationId: number,
  ) {
    return this.invitationsService.cancelInvitation(userId, invitationId);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Get(':id')
  getInvitationById(@Param('id', ParseIntPipe) invitationId: number) {
    return this.invitationsService.getInvitationById(invitationId);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @HasRole(Role.Admin)
  @Delete(':id')
  removeGroup(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invitationId: number,
  ) {
    return this.invitationsService.deleteInvitation(userId, invitationId);
  }
}
