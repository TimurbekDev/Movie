import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import { JwtCustomModule } from '../jwt';
import { GoogleStrategy } from './strategies';
import { RedisCustomModule, RedisService } from '@redis';
import { MailerCustomService } from '@mailer';
import { DevicesModule, DevicesService } from '../devices';

@Module({
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy,MailerCustomService],
  imports: [
    forwardRef(()=>UserModule),
    forwardRef(()=>JwtCustomModule),
    forwardRef(()=>RedisCustomModule),
    forwardRef(()=>DevicesModule)
  ]
})
export class AuthModule {}
