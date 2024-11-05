import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateCategory } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto implements ICreateCategory {
  @ApiProperty({
    required: true,
    example: 'Horror movie',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
