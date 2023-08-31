import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { signInAdminDto, signUpAdminDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: signUpAdminDto) {
    const hash = await argon.hash(dto.password);
    // console.log({ dto });
    try {
      const admin = await this.prisma.admin.create({
        data: {
          email: dto.email,
          hash,
          phone_number: dto.phone_number,
          lastName: dto.lastName,
          firstName: dto.firstName,
        },
      });
      return this.signToken(admin.id, admin.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'p2002')) {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: signInAdminDto) {
    // try {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!admin) {
      return new ForbiddenException('Credentials incorrect');
    }
    const pwMatches = await argon.verify(admin.hash, dto.password);
    if (!pwMatches) {
      // throw new ForbiddenException('Credentials incorrect');
      return new ForbiddenException('Credentials incorrect');
    }
    return this.signToken(admin.id, admin.email);
    // } catch (error) {

    // }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '2000m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
