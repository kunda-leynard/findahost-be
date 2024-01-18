import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TwilioModule as TModule } from "nestjs-twilio";
import { TwilioController } from "./twilio.controller";
import { TwilioService } from "./twilio.service";

@Module({
  imports: [
    TModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        accountSid: cfg.getOrThrow("TWILIO_ACCOUNT_SID"),
        authToken: cfg.getOrThrow("TWILIO_AUTH_TOKEN"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TwilioController],
  providers: [TwilioService],
})
export class TwilioModule {}
