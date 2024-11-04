import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }

  async findOne(id: number): Promise<Category> {
    if (!(await this.categoryModel.findByPk(id))) {
      throw new NotFoundException('Category not found');
    }
    return await this.categoryModel.findByPk(id);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    if (!(await this.categoryModel.findByPk(id))) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryModel.update(updateCategoryDto, { where: { id: id } });

    const updatedCategory = await this.categoryModel.findByPk(id);
    return updatedCategory;
  }

  async remove(id: number): Promise<object> {
    if (!(await this.categoryModel.findByPk(id))) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryModel.destroy({ where: { id: id } });

    if (!(await this.categoryModel.findByPk(id))) {
      return {
        message: 'Success deleted',
      };
    }
    return {
      message: 'Something wrong!',
    };
  }
}
