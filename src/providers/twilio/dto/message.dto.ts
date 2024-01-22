import { IsNotEmpty } from "class-validator";

export class MessageDto {
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  author: string;

  attributes?: string;
}
