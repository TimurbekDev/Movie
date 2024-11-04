import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IUserCreateInterface } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John',
  })
  name?: string;
  @ApiProperty({
    example: 'example@gmail.com',
  })
  email?: string;
  @ApiProperty({
    example: 'image.example',
  })
  image?: string;
}
