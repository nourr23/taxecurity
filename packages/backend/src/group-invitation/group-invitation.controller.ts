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
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateGroupInvitationDto } from './dto';
import { GroupInvitationService } from './group-invitation.service';

@Controller('group-invitations')
export class GroupInvitationController {
  constructor(private groupInvitationService: GroupInvitationService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllInvitations() {
    return this.groupInvitationService.getAllInvitations();
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
}
