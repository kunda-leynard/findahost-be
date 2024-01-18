import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested, IsIn, IsOptional } from "class-validator";
import { Type, Exclude } from "class-transformer";

import {
  Timers,
  Links,
  ConversationWebhookEnabledType,
  ConversationState,
} from "../twilio.interface";

export class ConversationEntity {
  friendlyName?: string;
  uniqueName?: string;
  attributes?: string;
  dateCreated?: Date;
  dateUpdated?: Date;
  binding?: any;
  url?: string;

  @IsIn(["true", "false"])
  @IsOptional()
  xTwilioWebhookEnabled?: ConversationWebhookEnabledType;

  @Type(() => Timers)
  @ValidateNested()
  readonly timers?: Timers;

  @Type(() => Links)
  @ValidateNested()
  readonly links?: Links;

  @IsIn(["inactive", "active", "closed"])
  @IsOptional()
  state?: ConversationState;
}
