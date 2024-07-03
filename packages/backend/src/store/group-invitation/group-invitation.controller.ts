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
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateGroupInvitationDto } from './dto';
import { GroupInvitationService } from './group-invitation.service';
import {
  FilteredGroupInvitationsDto,
  PaginationGroupInvitationsDto,
} from './dto/filtered-group-invitaion';

import { HasRole } from 'src/auth/decorator/has-role.decorator';
import { Role } from 'src/auth/enums';
import { RolesGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('group-invitations')
export class GroupInvitationController {
  constructor(private groupInvitationService: GroupInvitationService) {}

  @HasRole(Role.Admin)
  @Get()
  getAllInvitations(
    @Query() paginationGroupInvitationDto: PaginationGroupInvitationsDto,
  ) {
    return this.groupInvitationService.getAllInvitations(
      paginationGroupInvitationDto,
    );
  }
  @HasRole(Role.Admin)
  @Get('filtered')
  getFilteredUsers(
    @Query() filterGroupInvitationsDto: FilteredGroupInvitationsDto,
    @Query() paginationGroupInvitationDto: PaginationGroupInvitationsDto,
  ) {
    if (Object.keys(filterGroupInvitationsDto).length) {
      return this.groupInvitationService.getFilteredGroupInvitations(
        filterGroupInvitationsDto,
        paginationGroupInvitationDto,
      );
    } else
      return this.groupInvitationService.getAllInvitations(
        paginationGroupInvitationDto,
      );
  }

  // both roles can get group-invitations by id
  @Get(':id')
  getInvitationById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invitationId: number,
  ) {
    return this.groupInvitationService.getInvitationById(userId, invitationId);
  }

  @HasRole(Role.Driver)
  @Post()
  createGroupInvitation(
    @GetUser('id') userId: number,
    @Body() dto: CreateGroupInvitationDto,
  ) {
    return this.groupInvitationService.createGroupInvitation(userId, dto);
  }

  @HasRole(Role.Driver)
  @Delete('remove/:id')
  removeInvitation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invitationId: number,
  ) {
    return this.groupInvitationService.removeInvitation(userId, invitationId);
  }

  @HasRole(Role.Driver)
  @Delete('decline/:id')
  declineInvitation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invitationId: number,
  ) {
    return this.groupInvitationService.declineInvitation(userId, invitationId);
  }

  @HasRole(Role.Driver)
  @Post('accept')
  acceptGroupInvitations(
    @GetUser('id') userId: number,
    @Body('inviteId') inviteId: number,
  ) {
    return this.groupInvitationService.acceptGroupInvitation(userId, inviteId);
  }
}
