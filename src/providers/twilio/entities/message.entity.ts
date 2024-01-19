import { Exclude } from "class-transformer";

export class MessageEntity {
  @Exclude()
  accountSid: string;

  @Exclude()
  conversationSid: string;

  sid: string;
  author: string;
  index: Number;
  body: string;
  media: any;
  attributes: string;
  participantSid: string;
  dateCreated: Date;
  dateUpdated: Date;

  constructor(partial: Partial<MessageEntity>) {
    Object.assign(this, partial);
  }
}
