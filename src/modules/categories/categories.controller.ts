import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Category } from './entities';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { UserRoles } from '../user';
import { Protected, Roles } from '@decorators';

@ApiTags('Categories')
@ApiBearerAuth('auth')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(+id);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.categoriesService.remove(+id);
  }
}
