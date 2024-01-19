import { Injectable } from "@nestjs/common";
import { TwilioService as TService } from "nestjs-twilio";
import { queryParser } from "../utilities";

import { ConversationDto, MessageDto } from "./dto";
import { ConversationEntity, MessageEntity } from "./entities";

@Injectable()
export class TwilioService {
  public constructor(private readonly twilioService: TService) {}

  // * Conversations
  async createConversation(opt: ConversationDto) {
    return this.twilioService.client.conversations.v1.conversations.create(opt);
  }

  async getSpecificConversation(cid: string) {
    return await this.twilioService.client.conversations.v1
      .conversations(cid)
      .fetch()
      .then(
        (e) =>
          new ConversationEntity({
            sid: e.sid,
            accountSid: e.accountSid,
            chatServiceSid: e.chatServiceSid,
            messagingServiceSid: e.messagingServiceSid,
            friendlyName: e.friendlyName,
            uniqueName: e.uniqueName,
            attributes: e.attributes,
            dateCreated: e.dateCreated,
            dateUpdated: e.dateUpdated,
            binding: e.bindings,
            url: e.url,
            timers: e.timers,
            links: e.links,
            state: e.state,
          })
      )
      .catch((e) => {
        return {
          status: 404,
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
      });

    let conversations =
      await this.twilioService.client.conversations.v1.conversations
        .list(opt)
        .then((doc) =>
          doc.map(
            (e) =>
              new ConversationEntity({
                sid: e.sid,
                accountSid: e.accountSid,
                chatServiceSid: e.chatServiceSid,
                messagingServiceSid: e.messagingServiceSid,
                friendlyName: e.friendlyName,
                uniqueName: e.uniqueName,
                attributes: e.attributes,
                dateCreated: e.dateCreated,
                dateUpdated: e.dateUpdated,
                binding: e.bindings,
                url: e.url,
                timers: e.timers,
                links: e.links,
                state: e.state,
              })
          )
        );

    return conversations;
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
      .fetch()
      .then(
        (e) =>
          new MessageEntity({
            accountSid: e.accountSid,
            conversationSid: e.conversationSid,
            sid: e.sid,
            author: e.author,
            index: e.index,
            body: e.body,
            media: e.media,
            attributes: e.attributes,
            participantSid: e.participantSid,
            dateCreated: e.dateCreated,
            dateUpdated: e.dateUpdated,
          })
      );
  }

  async getMessage(cid: string, opt?: Record<any, any>) {
    // add order: 'desc' for latest message fetch
    if (opt)
      opt = queryParser({
        query: opt,
        keys: ["order", "pageSize", "limit"],
        parseToIntKeys: ["pageSize", "limit"],
      });

    let messages = await this.twilioService.client.conversations.v1
      .conversations(cid)
      .messages.list(opt)
      .then((doc) =>
        doc.map(
          (e) =>
            new MessageEntity({
              accountSid: e.accountSid,
              conversationSid: e.conversationSid,
              sid: e.sid,
              author: e.author,
              index: e.index,
              body: e.body,
              media: e.media,
              attributes: e.attributes,
              participantSid: e.participantSid,
              dateCreated: e.dateCreated,
              dateUpdated: e.dateUpdated,
            })
        )
      );

    return messages;
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
