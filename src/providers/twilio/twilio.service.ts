import { Injectable } from "@nestjs/common";
import { TwilioService as TService } from "nestjs-twilio";
import { MessageListOpt } from "./twilio.interface";
import { queryParser } from "../utilities";

import { ConversationDto, MessageDto } from "./dto";

@Injectable()
export class TwilioService {
  public constructor(private readonly twilioService: TService) {}

  // * Conversations
  async createConversation(opt?: ConversationDto) {
    return this.twilioService.client.conversations.v1.conversations.create(opt);
  }

  async getSpecificConversation(cid: string) {
    return this.twilioService.client.conversations.v1
      .conversations(cid)
      .fetch()
      .catch((e) => {
        return {
          statusCode: 404,
          message: "Conversation not found",
        };
      });
  }

  async getConversation(opt?: Record<any, any>) {
    if (opt)
      opt = queryParser({
        query: opt,
        keys: ["startDate", "endDate", "state", "pageSize", "limit"],
        parseToIntKeys: ["pageSize", "limit"],
        //? can freely add new method on this functions for more validation in queries
      });

    return this.twilioService.client.conversations.v1.conversations.list(opt);
  }

  async updateConversation(cid: string, opt?: ConversationDto) {
    return this.twilioService.client.conversations.v1
      .conversations(cid)
      .update(opt);
  }

  async deleteConversation(cid: string) {
    return this.twilioService.client.conversations.v1
      .conversations(cid)
      .remove();
  }

  // * Messages
  async createMessage(cid: string, req: any, dto: MessageDto) {
    const { firstName, lastName } = req.user;
    let author = firstName + " " + lastName;

    return this.twilioService.client.conversations.v1
      .conversations(cid)
      .messages.create({ ...dto, author });
  }

  async getMessageSpecific(chid: string, imid: string) {
    return this.twilioService.client.conversations.v1
      .conversations(chid)
      .messages(imid)
      .fetch();
  }

  async getMessage(cid: string, opt?: Record<any, any>) {
    // add order: 'desc' for latest message fetch

    if (opt)
      opt = queryParser({
        query: opt,
        keys: ["order", "pageSize", "limit"],
        parseToIntKeys: ["pageSize", "limit"],
      });

    return this.twilioService.client.conversations.v1
      .conversations(cid)
      .messages.list(opt);
  }

  async updateMessage(chid: string, imid: string, dto: MessageDto) {
    return this.twilioService.client.conversations.v1
      .conversations(chid)
      .messages(imid)
      .update(dto);
  }

  async deleteMessage(chid: string, imid: string) {
    return this.twilioService.client.conversations.v1
      .conversations(chid)
      .messages(imid)
      .remove();
  }
}
