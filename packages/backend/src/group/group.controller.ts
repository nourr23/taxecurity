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
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  //admin
  @UseGuards(JwtGuard)
  @Get()
  getAllGroups() {
    return this.groupService.getGroups();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  getGroupById(@Param('id', ParseIntPipe) groupId: number) {
    return this.groupService.getGroupById(groupId);
  }

  //users
  @UseGuards(JwtGuard)
  @Delete(':id')
  removeGroup(
    @Param('id', ParseIntPipe) groupId: number,
    @GetUser('id') userId: number,
  ) {
    return this.groupService.deleteGroup(groupId, userId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateGroup(
    @Param('id', ParseIntPipe) groupId: number,
    @GetUser('id') userId: number,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(groupId, userId, dto);
  }

  @UseGuards(JwtGuard)
  @Post()
  createGroup(@GetUser('id') userId: number, @Body() dto: CreateGroupDto) {
    return this.groupService.createGroup(dto, userId);
  }
}
