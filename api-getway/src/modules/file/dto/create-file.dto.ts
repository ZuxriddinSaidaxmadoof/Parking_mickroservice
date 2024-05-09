import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFileDto {
    location: string;
    name: string;
    minetype: string;
    size: number;
}

