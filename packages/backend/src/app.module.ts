import { Module } from '@nestjs/common';
import { AuthModule } from './auth/aurth.module';
import { UserModule } from './user/user.module';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [AuthModule, UserModule, AlertModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
