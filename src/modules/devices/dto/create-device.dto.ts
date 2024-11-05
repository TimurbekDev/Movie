import { ApiProperty } from "@nestjs/swagger";
import { ICreateDevice } from "../interfaces/create-device";

export class CreateDeviceDto implements ICreateDevice{
    @ApiProperty({
        example: "Windows 11",
        required: true
    })
    name:string
    @ApiProperty({
        example: "your acces token",
        required: true
    })
    acces_token: string

    @ApiProperty({
        example: "your refresh token",
        required: true
    })
    refresh_token: string;

    @ApiProperty({
        example: 1,
        required: true
    })
    user_id: number;
}
