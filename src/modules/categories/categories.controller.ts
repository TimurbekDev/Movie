import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { Category } from './entities';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@ApiTags("Categories")
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto):Promise<Category> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string):Promise<object> {
    return this.categoriesService.remove(+id);
  }
}
