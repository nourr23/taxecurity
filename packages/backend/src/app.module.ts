import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WorkerModule } from './admin/worker/worker.module';
import { UserModule } from './store/user/user.module';
import { AlertModule } from './store/alert/alert.module';
import { PrismaModule } from './prisma/prisma.module';
import { RequestModule } from './store/request/request.module';
import { GroupModule } from './store/group/group.module';
import { GroupInvitationModule } from './store/group-invitation/group-invitation.module';
import { GroupRequestModule } from './store/group-request/group-request.module';
import { InvitationsModule } from './admin/invitations/invitations.module';

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
    WorkerModule,
    InvitationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
