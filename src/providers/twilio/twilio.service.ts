import { Injectable } from "@nestjs/common";
import { TwilioService as TService } from "nestjs-twilio";
import { queryParser } from "../utilities";

import { ConversationDto, MessageDto, ParticipantDto } from "./dto";
import { ConversationEntity, MessageEntity } from "./entities";
import { MessageProps } from "./twilio.interface";

@Injectable()
export class TwilioService {
  public constructor(private readonly twilioService: TService) {}

  // * Conversations
  async createConversation(opt?: ConversationDto) {
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
    return this.twilioService.client.conversations.v1
      .conversations(cid)
      .messages.create({ ...dto, author: req.sub });
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

  // * Participant
  // ? create participant (chat)
  async createParticipantChat(chid: string, dto: ParticipantDto) {
    return this.twilioService.client.conversations.v1
      .conversations(chid)
      .participants.create(dto);
  }

  async sendMessage(opt: MessageProps) {
    const { channelId, req, messageObj } = opt.messageOpt;
    const participant = opt.participant;
    const participantId = opt.participantId;

    return new Promise(async (resolve, reject) => {
      if (channelId) {
        resolve(channelId);
      } else {
        await this.createConversation({
          friendlyName: "Taylor Switft",
        }).then((doc) => {
          console.log("Conversation created with an ID of ", doc.sid);
          resolve(doc.sid);
        });
      }
    }).then(async (conv: string) => {
      return new Promise(async (resolve, reject) => {
        if (participantId) {
          resolve(participantId);
        } else {
          await this.createParticipantChat(conv, participant)
            .then(async (_) => {
              console.log("Participation created with an ID of ", _.sid);
              resolve(_.sid);
            })
            .catch((e) => {
              console.log(e);
              return {
                statusCode: 500,
                error: e,
                message: "Error in Participation creation.",
              };
            });
        }
      }).then(async (partId: string) => {
        return await this.createMessage(conv, req, messageObj)
          .then((doc) => {
            console.log("Message created with an ID of ", doc.sid);
            return {
              statusCode: 200,
              message: "Message Succesfully Created",
              channelId: conv,
              participationId: partId,
            };
          })
          .catch((e) => {
            console.log(e);
            return {
              statusCode: 500,
              error: e,
              message: "Error in Message creation.",
            };
          });
      });
    });
  }
}
