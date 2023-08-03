import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        email: true,
        phone_number: true,
        lastName: true,
        firstName: true,
        age: true,
        city: true,
        followedBy: true,
        following: true,
      },
    });
    return users;
  }
  async getUserById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find user',
      });
    }
  }
  async editUser(userId: number, dto: EditUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...dto,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find user',
      });
    }
  }

  async removeUser(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return 'done'; // to refactor
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find user',
      });
    }
  }

  async acceptRequest(userId: number, followerId: number) {
    try {
      const follower = await this.prisma.user.findUnique({
        where: {
          id: followerId,
        },
      });
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followedBy: {
            connect: follower,
          },
          firstName: 'nour',
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find user',
      });
    }
  }
  async removeFromList(userId: number, followerId: number) {
    try {
      const follower = await this.prisma.user.findUnique({
        where: {
          id: followerId,
        },
      });
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followedBy: {
            disconnect: follower,
          },
          firstName: 'nour',
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find user',
      });
    }
  }
}
