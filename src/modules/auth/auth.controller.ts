import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('/google')
  async googleAuth() {}

  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  async googleAuthCallback(@Req() request: any) {
    return this.service.googleAuth(request);
  }
}
