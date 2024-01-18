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
  sid?: string;
  friendlyName?: string;
  dateCreated?: Date;
  dateUpdated?: Date;
  attributes?: string;
  messagingServiceSid?: string;
  uniqueName?: string;
  binding?: any;
  url?: string;

  @IsIn(["true", "false"])
  @IsOptional()
  xTwilioWebhookEnabled?: ConversationWebhookEnabledType;

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
