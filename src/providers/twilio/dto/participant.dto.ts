import { IsIn, IsOptional } from "class-validator";

import { ConversationWebhookEnabledType } from "../twilio.interface";

export class ParticipantDto {
  identity?: string;
  roleSid?: string;
  attributes?: string;
  channelId?: string;

  @IsIn(["true", "false"])
  @IsOptional()
  xTwilioWebhookEnabled?: ConversationWebhookEnabledType;
}
