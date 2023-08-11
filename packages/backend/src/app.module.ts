import { Module } from '@nestjs/common';
import { AuthModule } from './store/auth/aurth.module';
import { UserModule } from './store/user/user.module';
import { AlertModule } from './store/alert/alert.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './store/request/request.module';
import { GroupModule } from './store/group/group.module';
import { GroupInvitationModule } from './store/group-invitation/group-invitation.module';
import { GroupRequestModule } from './store/group-request/group-request.module';

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
    GroupInvitationModule,
    GroupRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
