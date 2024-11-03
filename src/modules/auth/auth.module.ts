import { Module } from '@nestjs/common';


import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google-strategy';
import { User, UsersService } from '../users';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({   
  imports: [SequelizeModule.forFeature([User])],
  providers: [GoogleStrategy, AuthService,UsersService],
  controllers: [AuthController],
})
export class AuthModule {}