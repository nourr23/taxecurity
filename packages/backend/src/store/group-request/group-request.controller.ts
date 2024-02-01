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
import { CreateGroupRequestDto } from './dto';
import { GroupRequestService } from './group-request.service';
import {
  FilteredGroupRequestsDto,
  PaginationGroupRequestsDto,
} from './dto/filtered-group-requests';
import { HasRole } from 'src/auth/decorator/has-role.decorator';
import { Role } from 'src/auth/enums';
import { RolesGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('group-requests')
export class GroupRequestController {
  constructor(private requestService: GroupRequestService) {}

  @HasRole(Role.Admin)
  @Get()
  getAllRequests(
    @Query() paginationGroupRequestDto: PaginationGroupRequestsDto,
  ) {
    return this.requestService.getRequests(paginationGroupRequestDto);
  }

  @HasRole(Role.Admin)
  @Get('filtered')
  getFilteredUsers(
    @Query() filterGroupRequestDto: FilteredGroupRequestsDto,
    @Query() paginationGroupRequestDto: PaginationGroupRequestsDto,
  ) {
    if (Object.keys(filterGroupRequestDto).length) {
      return this.requestService.getFilteredGroupRequests(
        filterGroupRequestDto,
        paginationGroupRequestDto,
      );
    } else return this.requestService.getRequests(paginationGroupRequestDto);
  }

  // both roles
  @Get(':id')
  getRequestById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    return this.requestService.getRequestById(userId, requestId);
  }

  @HasRole(Role.Driver)
  @Post()
  createGroupRequest(
    @GetUser('id') userId: number,
    @Body() dto: CreateGroupRequestDto,
  ) {
    return this.requestService.createGroupRequest(userId, dto);
  }

  @HasRole(Role.Driver)
  @Delete('remove/:id')
  removeRequest(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    return this.requestService.removeRequest(userId, requestId);
  }

  @HasRole(Role.Driver)
  @Delete('decline/:id')
  declineRequest(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    return this.requestService.declineRequest(userId, requestId);
  }

  @HasRole(Role.Driver)
  @Post('accept')
  acceptGroupRequest(
    @GetUser('id') userId: number,
    @Body('requestId') requestId: number,
  ) {
    return this.requestService.acceptGroupRequest(userId, requestId);
  }
}
