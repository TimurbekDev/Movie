import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICreateUserRequest, ICreateUserResponse, IUser } from './interfaces';
import { IUpdateUserRequest } from './interfaces/update-user.interface';
import { User } from './models';
import { hash } from 'bcrypt';
import { HASH_SALT } from '@constants';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from '../devices';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User
  ) { }

  async create(payload: ICreateUserRequest): Promise<ICreateUserResponse> {

    const existedUser = await this.findByEmail(payload.email)
    if (existedUser)
      throw new BadRequestException('Email already in use')

    payload.password = await hash(payload.password, HASH_SALT)
    const user = await this.userModel.create(payload)

    return {
      message: 'User created successfully',
      user: await this.findOne(user.id)
    };
  }

  async findAll() {
    return await this.userModel.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    });
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      include: [{model: Device}]
    })
    if (!user)
      throw new NotFoundException('User not found')

    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      where: {
        email
      }
    })
  }

  async update(payload: IUpdateUserRequest) {
    const user = await this.findOne(payload.id)
    await user.update({
      full_name: payload.full_name,
      role: payload.role,
      password: payload.password
    })


    return {
      message: 'User updated successfully',
      user: await this.findByEmail(user.email)
    };
  }

  async remove(id: number) {
    const user = this.findOne(id);
    (await user).destroy()

    return {
      message: 'User deleted successfully',
      user
    };
  }
}
