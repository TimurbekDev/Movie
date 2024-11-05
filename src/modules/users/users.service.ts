import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities';
import { Device } from '../devices';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({include: [{model: Device}]});
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email: email } });
  }

  async findOne(id: number): Promise<User> {
    const foundeduser = await this.userModel.findByPk(id);
    if (!foundeduser) {
      throw new NotFoundException('User mot found');
    }
    return foundeduser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<object> {
    const foundeduser = await this.userModel.findByPk(id);
    if (!foundeduser) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.update(updateUserDto, { where: { id: id } });
    return {
      message: 'Updated success',
    };
  }

  async remove(id: number): Promise<object> {
    const foundeduser = await this.userModel.findByPk(id);
    if (!foundeduser) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.destroy({ where: { id: id } });
    return {
      message: 'Deleted success',
    };
  }
}
