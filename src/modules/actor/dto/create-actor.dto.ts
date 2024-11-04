import { ApiProperty } from '@nestjs/swagger';

export class CreateActorDto {
  @ApiProperty({
    required: true,
    example: 'Tony Stark',
  })
  name: string;
  @ApiProperty({
    required: true,
    example: 'image.jpg',
  })
  image: string;
}
