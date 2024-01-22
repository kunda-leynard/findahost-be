import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SendMessageDto {
  channelId?: string;
  participantId?: string;

  @IsNotEmpty()
  identity: string;

  @IsNotEmpty()
  message: string;
}
