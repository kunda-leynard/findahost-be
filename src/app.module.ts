import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { S3Module } from './common/aws/s3/s3.module';
import { DatabaseModule } from './common/database/database.module';
import { JwtAuthGuard } from './common/guards';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    S3Module,
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
