import { Module } from '@nestjs/common';
import { AuthModule } from './auth/aurth.module';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, AlertModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
