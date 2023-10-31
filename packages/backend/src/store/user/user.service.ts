import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto, FilteredUserDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        // take: 2,
        // skip: 1,
        select: {
          id: true,
          email: true,
          phone_number: true,
          lastName: true,
          firstName: true,
          age: true,
          city: true,
          followedBy: true,
          following: true,
          requestReceived: {
            select: {
              sender: true,
            },
          },
          requestSent: {
            select: {
              receiver: true,
            },
          },
        },
      });
      return users;
    } catch (error) {}
  }

  async getFilteredUsers(filterUserDto: FilteredUserDto) {
    try {
      const users = await this.prisma.user.findMany({
        take: 10,
        skip: 0,
        where: {
          OR: [
            {
              email: {
                contains: filterUserDto.email,
                mode: 'insensitive',
              },
            },
            {
              firstName: {
                contains: filterUserDto.firstName,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: filterUserDto.lastName,
                mode: 'insensitive',
              },
            },
            { phone_number: { contains: filterUserDto.phone_number } },
          ],
        },
        select: {
          id: true,
          email: true,
          phone_number: true,
          lastName: true,
          firstName: true,
          age: true,
          city: true,
          followedBy: true,
          following: true,
          requestReceived: {
            select: {
              sender: true,
            },
          },
          requestSent: {
            select: {
              receiver: true,
            },
          },
        },
        orderBy: {
          firstName: 'asc',
        },
      });
      return users;
    } catch (error) {}
  }

  async getUserById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          email: true,
          phone_number: true,
          lastName: true,
          firstName: true,
          age: true,
          city: true,
          followedBy: true,
          following: true,
          requestReceived: {
            select: {
              sender: true,
            },
          },
          requestSent: {
            select: {
              receiver: true,
            },
          },
          groups: true,
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
    console.log(id);
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
        },
      });
      if (user) {
        await this.prisma.request.deleteMany({
          where: {
            senderId: followerId,
            receiverId: userId,
          },
        });
      }
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
  async unfollow(userId: number, followerId: number) {
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
          following: {
            disconnect: follower,
          },
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
