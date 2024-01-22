import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Header,
} from "@nestjs/common";

import { TwilioService } from "./twilio.service";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { MessageEntity } from "./entities";

import { SendMessageDto } from "./dto/send_message.dto";

// TODO: delete method after success only return true

@ApiTags("Channel")
@Controller("channel")
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  // ! retain so can delete conversation via request
  //? delete conversation
  @Delete("conversation/:chid")
  @HttpCode(HttpStatus.OK)
  deleteConversation(@Param("chid") id: string) {
    return this.twilioService.deleteConversation(id);
  }

  @Post("onmessage")
  async onMessage(@Body() b: any) {
    console.log(b);
  }

  // TODO: conversation friendly name should be updated
  @Post("/webchat/")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ type: MessageEntity })
  async sentMessage(@Body() body: SendMessageDto) {
    return this.twilioService.sendMessage(body);
  }
}
