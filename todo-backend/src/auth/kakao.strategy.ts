import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { AuthType } from 'src/user/user.entity';
import { AuthService } from './auth.service';

config();

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.OAUTH_KAKAO_CLIENT_ID,
      clientSecret: process.env.OAUTH_KAKAO_SECRET,
      callbackURL: 'http://localhost:7000/auth/kakao/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const rawUser = {
      email: profile._json.kakao_account.email,
      username: profile.displayName,
      activated: true,
      auth_id: profile.id,
      auth_type: AuthType.Kakao,
      accessToken,
    };

    const user = await this.authService.validateUserGoogle(rawUser);

    done(null, user);
  }
}
