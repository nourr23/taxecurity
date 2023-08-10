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
import { CreateGroupRequestDto } from './dto';
import { GroupRequestService } from './group-request.service';

@Controller('group-requests')
export class GroupRequestController {
  constructor(private requestService: GroupRequestService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllRequests() {
    return this.requestService.getRequests();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getRequestById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    return this.requestService.getRequestById(userId, requestId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createGroupRequest(
    @GetUser('id') userId: number,
    @Body() dto: CreateGroupRequestDto,
  ) {
    return this.requestService.createGroupRequest(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('remove/:id')
  removeRequest(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    return this.requestService.removeRequest(userId, requestId);
  }

  @UseGuards(JwtGuard)
  @Delete('decline/:id')
  declineRequest(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    return this.requestService.declineRequest(userId, requestId);
  }

  @UseGuards(JwtGuard)
  @Post('accept')
  acceptGroupRequest(
    @GetUser('id') userId: number,
    @Body('requestId') requestId: number,
  ) {
    return this.requestService.acceptGroupRequest(userId, requestId);
  }
}
