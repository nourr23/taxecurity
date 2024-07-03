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
import { RequestService } from './request.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { FilteredRequestsDto, PaginationRequestsDto } from './dto';
import { HasRole } from 'src/auth/decorator/has-role.decorator';
import { Role } from 'src/auth/enums';
import { RolesGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {}

  @HasRole(Role.Admin)
  @Get()
  getAllRequests(@Query() paginationRequestDto: PaginationRequestsDto) {
    return this.requestService.getRequests(paginationRequestDto);
  }

  @HasRole(Role.Admin)
  @Get('filtered')
  getFilteredRequests(
    @Query() filterRequestDto: FilteredRequestsDto,
    @Query() paginationRequestDto: PaginationRequestsDto,
  ) {
    if (Object.keys(filterRequestDto).length) {
      return this.requestService.getFilteredRequests(
        filterRequestDto,
        paginationRequestDto,
      );
    } else return this.requestService.getRequests(paginationRequestDto);
  }

  //both roles? or most likely we wont need it..
  @Get()
  getRequestById(@Body('id', ParseIntPipe) requestId: number) {
    return this.requestService.getRequestById(requestId);
  }

  @HasRole(Role.Driver)
  @Delete('deleteRequest')
  deleteRequestById(@Body('id', ParseIntPipe) requestId: number) {
    return this.requestService.deleteRequest(requestId);
  }

  @HasRole(Role.Driver)
  @Post()
  createRequest(
    @GetUser('id') senderId: number,
    @Body('receiverId', ParseIntPipe) receiverId: number,
  ) {
    return this.requestService.createRequest(senderId, receiverId);
  }

  @HasRole(Role.Driver)
  @Delete('cancelRequest')
  cancelRequest(
    @GetUser('id') userId: number,
    @Body('destinationId') destinationId: number,
  ) {
    return this.requestService.removeRequest(userId, destinationId);
  }

  @HasRole(Role.Driver)
  @Delete('declineRequest')
  declineRequest(
    @GetUser('id') userId: number,
    @Body('senderId') senderId: number,
  ) {
    return this.requestService.declineRequest(userId, senderId);
  }
}
