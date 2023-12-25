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

@Controller('group-invitations')
export class GroupInvitationController {
  constructor(private groupInvitationService: GroupInvitationService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllInvitations(
    @Query() paginationGroupInvitationDto: PaginationGroupInvitationsDto,
  ) {
    return this.groupInvitationService.getAllInvitations(
      paginationGroupInvitationDto,
    );
  }
  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Get(':id')
  getInvitationById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invitationId: number,
  ) {
    return this.groupInvitationService.getInvitationById(userId, invitationId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createGroupInvitation(
    @GetUser('id') userId: number,
    @Body() dto: CreateGroupInvitationDto,
  ) {
    return this.groupInvitationService.createGroupInvitation(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('remove/:id')
  removeInvitation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invitationId: number,
  ) {
    return this.groupInvitationService.removeInvitation(userId, invitationId);
  }

  @UseGuards(JwtGuard)
  @Delete('decline/:id')
  declineInvitation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) invitationId: number,
  ) {
    return this.groupInvitationService.declineInvitation(userId, invitationId);
  }

  @UseGuards(JwtGuard)
  @Post('accept')
  acceptGroupInvitations(
    @GetUser('id') userId: number,
    @Body('inviteId') inviteId: number,
  ) {
    return this.groupInvitationService.acceptGroupInvitation(userId, inviteId);
  }
}
