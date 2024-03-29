import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { S3Module } from "./common/aws/s3/s3.module";
import { DatabaseModule } from "./common/database/database.module";
import { JwtAuthGuard } from "./common/guards";

import { TwilioModule } from "./providers/twilio/twilio.module";
import { AppLoggerMiddleware } from "./providers/middleware/logger";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    S3Module,
    DatabaseModule,
    AuthModule,
    UsersModule,
    TwilioModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

//  injects a logger
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
