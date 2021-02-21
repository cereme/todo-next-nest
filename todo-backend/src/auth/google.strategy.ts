import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { AuthType } from 'src/user/user.entity';
import { AuthService } from './auth.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.OAUTH_GOOGLE_SECRET,
      scope: ['email', 'profile'],
      callbackURL: 'http://localhost:7000/auth/google/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const rawUser = {
      email: emails[0].value,
      username: displayName,
      picture: photos[0].value,
      activated: true,
      auth_id: id,
      auth_type: AuthType.Google,
      accessToken,
    };

    const user = await this.authService.validateUserGoogle(rawUser);

    done(null, user);
  }
}
