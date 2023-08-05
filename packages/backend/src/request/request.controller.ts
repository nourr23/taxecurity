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
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

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

  // decline request
  // get request by id for admin
  // get requests for admin
  // delete request by id for admin
}
