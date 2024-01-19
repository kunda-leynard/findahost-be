import { MessageDto, ParticipantDto } from "./dto";

// * re-create interface from twilio
export type ConversationState = "inactive" | "active" | "closed";
export type ConversationWebhookEnabledType = "true" | "false";
export type MessageOrderType = "asc" | "desc";

interface MessageOptions {
  channelId?: string;
  req: any;
  messageObj: MessageDto;
}

export class Timers {
  date_inactive?: Date;
  date_closed?: Date;
}

export class Links {
  participants: string;
  messages: string;
  webhooks: string;
}

export interface ConversationListOpt {
  startDate: string;
  endDate?: string;
  state?: ConversationState;
  pageSize?: number;
  limit?: number;
}

export interface MessageListOpt {
  order?: MessageOrderType;
  pageSize?: number;
  limit?: number;
}

export interface MessageProps {
  messageOpt: MessageOptions;
  participant: ParticipantDto;
  participantId?: string;
}

export interface MessageBindingProps {
  address?: string;
  proxyAddress?: string;
  projectedAddress?: string;
}
