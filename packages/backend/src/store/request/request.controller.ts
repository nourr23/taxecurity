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
import { RequestService } from './request.service';
import { GetUser } from 'src/store/auth/decorator';
import { JwtGuard } from 'src/store/auth/guard';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllRequests() {
    return this.requestService.getRequests();
  }

  @UseGuards(JwtGuard)
  @Get()
  getRequestById(@Body('id', ParseIntPipe) requestId: number) {
    return this.requestService.getRequestById(requestId);
  }

  @UseGuards(JwtGuard)
  @Delete('deleteRequest')
  deleteRequestById(@Body('id', ParseIntPipe) requestId: number) {
    return this.requestService.deleteRequest(requestId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createRequest(
    @GetUser('id') senderId: number,
    @Body('receiverId', ParseIntPipe) receiverId: number,
  ) {
    return this.requestService.createRequest(senderId, receiverId);
  }

  @UseGuards(JwtGuard)
  @Delete('cancelRequest')
  cancelRequest(
    @GetUser('id') userId: number,
    @Body('destinationId') destinationId: number,
  ) {
    return this.requestService.removeRequest(userId, destinationId);
  }

  @UseGuards(JwtGuard)
  @Delete('declineRequest')
  declineRequest(
    @GetUser('id') userId: number,
    @Body('senderId') senderId: number,
  ) {
    return this.requestService.declineRequest(userId, senderId);
  }
}
