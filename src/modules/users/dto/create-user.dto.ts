import { ApiProperty } from "@nestjs/swagger";
import { IUserCreateInterface } from "../interfaces/user-create.interfaces";
import { userStatus } from "../userStatus";

export class CreateUserDto implements IUserCreateInterface {
    @ApiProperty({
        required: true,
        example: "John Doe"
    })
    name: string;

    @ApiProperty({
        required: true,
        example: "example@gmail.com"
    })
    email: string;
    status: userStatus;
    image: string;
}
