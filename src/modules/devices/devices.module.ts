import { forwardRef, Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Device } from './entities';
import { User, UserModule, UserService } from '../user';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [SequelizeModule.forFeature([Device]),
],
  exports: [DevicesService]
})
export class DevicesModule {}
