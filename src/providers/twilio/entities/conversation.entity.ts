import { ValidateNested, IsIn, IsOptional } from "class-validator";
import { Exclude, Type } from "class-transformer";

import { Timers, ConversationState } from "../twilio.interface";

export class ConversationEntity {
  sid: string;
  friendlyName: string;
  uniqueName: string;
  attributes: string;
  dateCreated: Date;
  dateUpdated: Date;
  binding: any;
  url: string;
  timers: Timers;
  links: Record<any, any>;
  state: ConversationState;

  @Exclude()
  accountSid: string;

  @Exclude()
  chatServiceSid: string;

  @Exclude()
  messagingServiceSid: string;

  constructor(partial: Partial<ConversationEntity>) {
    Object.assign(this, partial);
  }
}
