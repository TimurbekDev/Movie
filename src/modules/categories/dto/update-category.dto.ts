import { IUpdateCategory } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto implements IUpdateCategory {
  @ApiProperty({
    example: 'Update category name',
  })
  name?: string;
}
