import { ApiProperty } from "@nestjs/swagger";

export class MessageEntity {
  @ApiProperty({
    type: String,
    description: "Message author",
  })
  author: string;

  @ApiProperty({
    type: String,
    description: "Message Body",
  })
  body: string;

  @ApiProperty({
    type: String,
    description: "Message Attributes",
  })
  attributes: string;

  @ApiProperty({
    type: String,
  })
  dateCreated: Date;

  @ApiProperty({
    type: String,
  })
  dateUpdated: Date;
}
