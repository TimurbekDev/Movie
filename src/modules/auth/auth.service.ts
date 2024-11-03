import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UsersService, userStatus } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwt: JwtService,
  ) {}

  async googleAuth(req: any) {
    console.log(req.user);

    const foundeduser = await this.userService.findByEmail(req.user.emails[0].value)

    if (foundeduser) {
      return {message: "User arleady exists"};
    }

    const newUser = await this.userService.create({
        name: req.user.displayName,
        email: req.user.emails[0].value,
        image: req.user.photos[0].value,
        status: userStatus.USER
    })



    const accessToken = this.jwt.sign(
      { id: newUser.id, status: newUser.status },
      { secret: 'my-secret-key' },
    );
    return { accessToken, user: newUser, isNew: true };
  }
}