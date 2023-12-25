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

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get()
  getAllUsers(
    @Query('skip', ParseIntPipe) paginationUserDto: PaginationUserDto,
  ) {
    return this.userService.getAllUsers(paginationUserDto);
  }

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.userService.getUserById(userId);
  }

  @UseGuards(JwtGuard)
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    this.userService.editUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.userService.removeUser(userId); // to refactor; only the admin can delete a user
  }

  @UseGuards(JwtGuard)
  @Patch('add_follower')
  addFollower(
    @GetUser('id') userId: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    this.userService.acceptRequest(userId, followerId);
  }

  @UseGuards(JwtGuard)
  @Patch('remove_follower')
  removeFollower(
    @GetUser('id') userId: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    this.userService.removeFromList(userId, followerId);
  }
  @UseGuards(JwtGuard)
  @Patch('unfollow')
  unfollow(
    @GetUser('id') userId: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    return this.userService.unfollow(userId, followerId);
  }
}
