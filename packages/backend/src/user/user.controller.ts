import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.userService.getUserById(userId);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
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
    return this.userService.removeUser(userId);
  }

  @UseGuards(JwtGuard)
  @Patch('add_follower/:id')
  addFollower(
    @Param('id', ParseIntPipe) id: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    this.userService.acceptRequest(id, followerId);
  }

  @UseGuards(JwtGuard)
  @Patch('add_follower/:id')
  removeFollower(
    @Param('id', ParseIntPipe) id: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    this.userService.removeFromList(id, followerId);
  }
}
