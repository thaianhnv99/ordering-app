import { UsersDocument } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtSrvice: JwtService,
  ) {}

  async login(user: UsersDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id?.toString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtSrvice.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }

  async logout(response: Response) {
    const expires = new Date();
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires,
    });
  }
}
