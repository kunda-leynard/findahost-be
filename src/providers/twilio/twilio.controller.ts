import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { TwilioService } from "./twilio.service";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ConversationEntity, MessageEntity } from "./entities";
import { ConversationDto, MessageDto } from "./dto";

// TODO: make a util func query parser
// TODO: delete method after success only return true

@ApiTags("Channel")
@Controller("channel")
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  // * CONVERSATION API * //
  //? create conversation
  @Post("conversation")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ConversationEntity })
  async createConversation(@Body() dto: ConversationDto) {
    return await this.twilioService.createConversation(dto);
  }

  //? get all conversation
  @Get("conversation")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ConversationEntity })
  findAllConversation(@Query() query: Record<string, any>) {
    return this.twilioService.getConversation(query);
  }

  //? get conversation specific using channel id
  @Get("conversation/:chid")
  findSpecificConversation(@Param("chid") id: string) {
    return this.twilioService.getSpecificConversation(id);
  }

  //? update conversation
  @Patch("conversation/:chid")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: ConversationEntity })
  async updateConversation(
    @Param("chid") id: string,
    @Body() dto: ConversationDto
  ) {
    return await this.twilioService.updateConversation(id, dto);
  }

  //? delete conversation
  @Delete("conversation/:chid")
  @HttpCode(HttpStatus.OK)
  deleteConversation(@Param("chid") id: string) {
    return this.twilioService.deleteConversation(id);
  }
  // * END OF CONVERSATION API * //

  // * MESSAGE API * //
  //? create message
  @Post("message/:chid")
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: MessageEntity })
  async createMessage(
    @Req() req: any,
    @Param("chid") id: string,
    @Body() dto: MessageDto
  ) {
    return await this.twilioService.createMessage(id, req, dto);
  }

  //? get message all
  @Get("message/:chid")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MessageEntity })
  findAllMessage(
    @Param("chid") id: string,
    @Query() query: Record<string, any>
  ) {
    return this.twilioService.getMessage(id, query);
  }

  //? get message specific
  @Get("message/:chid/:imid")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MessageEntity })
  findMessageSpecific(@Param("chid") id: string, @Param("imid") imid: string) {
    return this.twilioService.getMessageSpecific(id, imid);
  }

  //? update message specific
  @Patch("message/:chid/:imid")
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: MessageEntity })
  async updateMessage(
    @Param("chid") id: string,
    @Param("imid") imid: string,
    @Body() dto: MessageDto
  ) {
    return this.twilioService.updateMessage(id, imid, dto);
  }

  // delete message
  @Delete("message/:chid/:imid")
  @HttpCode(HttpStatus.OK)
  deleteMessage(@Param("chid") id: string, @Param("imid") imid: string) {
    return this.twilioService.deleteMessage(id, imid);
  }
  // * END OF MESSAGE API * //
}
