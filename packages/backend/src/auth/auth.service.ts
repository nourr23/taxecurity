import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        phone_number: dto.phone_number,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return this.signToken(user.id, user.phone_number);
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          phone_number: dto.phone_number,
          lastName: dto.lastName,
          firstName: dto.firstName,
        },
      });
      return this.signToken(user.id, user.phone_number);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'p2002')) {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    phone_number: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      phone_number,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
