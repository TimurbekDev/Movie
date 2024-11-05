import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Interstellar',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    type: String,
    required: true,
    example:
      'In the near future around the American Midwest, Cooper, an ex-science engineer and pilot, is tied to his farming land with his daughter Murph and son Tom. As devastating sandstorms ravage Earths crops, the people of Earth realize their life here is coming to an end as food begins to run out. Eventually stumbling upon a N.A.S.A. base 6 hours from Coopers home, he is asked to go on a daring mission with a few other scientists into a wormhole because of Coopers scientific intellect and ability to pilot aircraft unlike the other crew members. In order to find a new home while Earth decays, Cooper must decide to either stay, or risk never seeing his children again in order to save the human race by finding another habitable planet.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;


  @ApiProperty({
    type: String,
    required: true,
    format: 'binary',
    description: 'Kino rasmi berilishi shart',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    type: String,
    required: true,
    format: 'binary',
    description: 'Kino video fayli berilishi shart',
  })
  @IsString()
  @IsNotEmpty()
  video: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'English',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  category_id: number;
}
