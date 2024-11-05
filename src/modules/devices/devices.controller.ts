import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities';
import { IDeleteDevice } from './interfaces';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("devices")
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll(): Promise<Device[]> {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IDeleteDevice> {
    return this.devicesService.remove(+id);
  }
}
