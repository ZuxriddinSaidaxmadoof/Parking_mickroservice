import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateFileDto{
    @ApiProperty({required: true, type: String})
    @IsString()
    @IsNotEmpty()
    name: string;
}