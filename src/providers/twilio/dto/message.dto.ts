import { IsNotEmpty } from "class-validator";

export class MessageDto {
  @IsNotEmpty()
  body: string;

  attributes?: string;
}
