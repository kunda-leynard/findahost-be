import { ParticipantDto, MessageDto } from "./";

import { ValidateNested, IsNotEmpty } from "class-validator";
import { Exclude, Type } from "class-transformer";

export class ParticipantMessageDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ParticipantDto)
  participant: ParticipantDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MessageDto)
  message: MessageDto;

  @Exclude()
  participationId?: string;
}
