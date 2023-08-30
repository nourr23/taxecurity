import { Module } from '@nestjs/common';
import { AuthModule } from './store/auth/auth.module';
import { UserModule } from './store/user/user.module';
import { AlertModule } from './store/alert/alert.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './store/request/request.module';
import { GroupModule } from './store/group/group.module';
import { GroupInvitationModule } from './store/group-invitation/group-invitation.module';
import { GroupRequestModule } from './store/group-request/group-request.module';
import { AuthAdminModule } from './admin/auth/auth.module';
import { WorkerModule } from './admin/worker/worker.module';

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
    AuthAdminModule,
    WorkerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
