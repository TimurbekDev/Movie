import { ApiProperty } from "@nestjs/swagger";

export class CreateActorMovieDto {
    @ApiProperty({
        required: true,
        example: 1
    })
    actorId: number

    @ApiProperty({
        required: true,
        example: 1
    })
    movieId: number

}
