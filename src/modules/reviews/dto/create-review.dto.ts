import { ApiProperty } from "@nestjs/swagger"

export class CreateReviewDto {
    @ApiProperty({
        required: true,
        example: 1
    })
    user_id: number
    @ApiProperty({
        required: true,
        example: 1
    })
    movie_id: number
    @ApiProperty({
        required: true,
        example: "This is movie good"
    })
    text: string
}
