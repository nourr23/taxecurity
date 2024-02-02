import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { signInDto, signUpDto } from './dto';
import { Role } from './enums';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: signUpDto) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: {
          phone: dto.phone,
        },
      });
      if (existing) {
        throw new ForbiddenException('Credentials taken');
      }

      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          phone: dto.phone,
          lastName: dto.lastName,
          firstName: dto.firstName,
        },
      });
      return this.signToken(user.id, Role.Driver);
    } catch (error) {
      throw error;
    }
  }

  async signIn(dto: signInDto) {
    try {
      let role: Role = Role.Admin;
      let user = null;
      user = await this.prisma.admin.findUnique({
        where: {
          email: dto.login,
          status: 'active', // test if worker is active
        },
      });
      if (!user) {
        role = Role.Driver;
        user = await this.prisma.user.findUnique({
          where: {
            phone: dto.login,
          },
        });
      }
      if (!user) {
        throw new ForbiddenException('Credentials incorrect');
      }
      const pwMatches = await argon.verify(user.hash, dto.password);
      if (!pwMatches) {
        throw new ForbiddenException('Credentials incorrect');
      }
      return this.signToken(user.id, role);
    } catch (error) {
      throw new ForbiddenException('Credentials incorrect');
    }
  }

  async signToken(sub: number, role: Role): Promise<{ access_token: string }> {
    const payload = { sub, role };
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
