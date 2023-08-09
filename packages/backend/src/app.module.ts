import { Module } from '@nestjs/common';
import { AuthModule } from './auth/aurth.module';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './request/request.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AlertModule,
    PrismaModule,
    RequestModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
