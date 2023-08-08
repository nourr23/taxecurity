import { Module } from '@nestjs/common';
import { AuthModule } from './auth/aurth.module';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './request/request.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
