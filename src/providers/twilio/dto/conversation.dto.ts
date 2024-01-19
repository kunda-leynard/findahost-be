import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested, IsIn, IsOptional } from "class-validator";
import { Type } from "class-transformer";

import {
  Timers,
  Links,
  ConversationWebhookEnabledType,
  ConversationState,
} from "../twilio.interface";

export class ConversationDto {
  friendlyName: string;
  attributes?: string;
  uniqueName?: string;
  binding?: any;

  @IsIn(["inactive", "active", "closed"])
  @IsOptional()
  state?: ConversationState;

  @Type(() => Timers)
  @ValidateNested()
  readonly timers?: Timers;

  @Type(() => Links)
  @ValidateNested()
  readonly links: Links;
}
