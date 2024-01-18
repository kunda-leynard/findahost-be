import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class MessageDto {
  @ApiProperty({
    type: String,
    description: "Message Body",
  })
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    type: String,
    description: "Message attribute",
  })
  attributes?: string;
}
