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
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import {
  CreateGroupDto,
  FilteredGroupDto,
  PaginationGroupDto,
  UpdateGroupDto,
} from './dto';
import { GroupService } from './group.service';
import { HasRole } from 'src/auth/decorator/has-role.decorator';
import { Role } from 'src/auth/enums';
import { RolesGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @HasRole(Role.Admin)
  @Get()
  getAllGroups(@Query() paginationGroupDto: PaginationGroupDto) {
    return this.groupService.getGroups(paginationGroupDto);
  }

  @HasRole(Role.Admin)
  @Get('filtered')
  getFilteredGroups(
    @Query() filterGroupDto: FilteredGroupDto,
    @Query() paginationGroupDto: PaginationGroupDto,
  ) {
    if (Object.keys(filterGroupDto).length) {
      return this.groupService.getFilteredGroups(
        filterGroupDto,
        paginationGroupDto,
      );
    } else return this.groupService.getGroups(paginationGroupDto);
  }

  // @HasRole(Role.Admin)
  @Get(':id')
  getGroupById(@Param('id', ParseIntPipe) groupId: number) {
    return this.groupService.getGroupById(groupId);
  }

  // @HasRole(Role.Driver)
  // @HasRole(Role.Admin)
  @Delete(':id')
  removeGroup(
    @Param('id', ParseIntPipe) groupId: number,
    @GetUser('id') userId: number,
  ) {
    return this.groupService.deleteGroup(groupId, userId);
  }

  // @HasRole(Role.Driver) both for now
  @Patch(':id')
  updateGroup(
    @Param('id', ParseIntPipe) groupId: number,
    @GetUser('id') userId: number,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(groupId, userId, dto);
  }

  @HasRole(Role.Driver)
  @Post()
  createGroup(@GetUser('id') userId: number, @Body() dto: CreateGroupDto) {
    return this.groupService.createGroup(dto, userId);
  }

  @HasRole(Role.Driver)
  @Post('kick')
  kickUserFromGroup(
    @GetUser('id') userId: number,
    @Body('targetId') targetId: number,
    @Body('groupId') groupId: number,
  ) {
    return this.groupService.kickUserFromGroup(userId, groupId, targetId);
  }

  @HasRole(Role.Driver)
  @Post('leave')
  leaveGroup(@GetUser('id') userId: number, @Body('groupId') groupId: number) {
    return this.groupService.leaveGroup(userId, groupId);
  }
}
