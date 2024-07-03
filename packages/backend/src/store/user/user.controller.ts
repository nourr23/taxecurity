import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto, FilteredUserDto, PaginationUserDto } from './dto';
import { UserService } from './user.service';
import { HasRole } from 'src/auth/decorator/has-role.decorator';
import { Role } from 'src/auth/enums';
import { RolesGuard } from 'src/auth/guard/role.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //both roles
  @Get()
  getAllUsers(
    @Query('skip', ParseIntPipe) paginationUserDto: PaginationUserDto,
  ) {
    return this.userService.getAllUsers(paginationUserDto);
  }

  //both roles
  @Get('filtered')
  getFilteredUsers(
    @Query() filterUserDto: FilteredUserDto,
    @Query() paginationUserDto: PaginationUserDto,
  ) {
    if (Object.keys(filterUserDto).length) {
      return this.userService.getFilteredUsers(
        filterUserDto,
        paginationUserDto,
      );
    } else return this.userService.getAllUsers(paginationUserDto);
  }

  @HasRole(Role.Driver)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  //both roles
  @Get(':id')
  getUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.userService.getUserById(userId);
  }

  @HasRole(Role.Driver)
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    this.userService.editUser(userId, dto);
  }

  @HasRole(Role.Admin)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.userService.removeUser(userId);
  }

  @HasRole(Role.Driver)
  @Patch('add_follower')
  addFollower(
    @GetUser('id') userId: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    this.userService.acceptRequest(userId, followerId);
  }

  @HasRole(Role.Driver)
  @Patch('remove_follower')
  removeFollower(
    @GetUser('id') userId: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    this.userService.removeFromList(userId, followerId);
  }

  @HasRole(Role.Driver)
  @Patch('unfollow')
  unfollow(
    @GetUser('id') userId: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    return this.userService.unfollow(userId, followerId);
  }
}
