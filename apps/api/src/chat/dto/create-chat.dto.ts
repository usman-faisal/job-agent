import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty()
    @IsString()
    user_query: string
}
