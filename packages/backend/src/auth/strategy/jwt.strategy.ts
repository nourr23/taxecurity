import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { ConfigService } from '@nestjs/config/';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/auth/enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { sub: number; role: Role }) {
    if (payload.role === Role.Admin) {
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (!admin) return null;
      delete admin.hash;
      return {
        ...admin,
        role: Role.Admin,
      };
    }
    if (payload.role === Role.Driver) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (!user) return null;
      delete user.hash;
      return {
        ...user,
        role: Role.Driver,
      };
    }
    return null;
  }
}
