import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './entities';
import { IDeleteDevice } from './interfaces';
import { UserService } from '../user';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device) private devices: typeof Device,
    // @Inject(UserService) private userService: UserService, 
){}
  async create(createDeviceDto: CreateDeviceDto) {
    return await this.devices.create(createDeviceDto);
  }

  findAll():Promise<Device[]> {
    return this.devices.findAll();
  }

  

  findByUserId(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  async remove(id: number):Promise<IDeleteDevice> {
    const foundedDevice = await this.devices.destroy({where: {id: id}})
    return {
      message: "deleted device"
    };
  }
}
