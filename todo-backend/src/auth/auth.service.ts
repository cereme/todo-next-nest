import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthType, User } from 'src/user/user.entity';
import { JwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserLocal(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    // TODO: Use hashed password
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { username, email, id, activated }: JwtPayload = user;
    const payload = { username, email, id, activated };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserSocial(rawUser, authType: AuthType) {
    if (!rawUser) {
      return null;
    }

    let user = await this.userService.getUserByAuthId(rawUser.auth_id);

    if (!user) {
      await this.userService.registerUserSocial({
        email: rawUser.email,
        username: rawUser.username,
        auth_id: rawUser.auth_id,
        auth_type: authType,
      });
    }

    user = await this.userService.getUserByAuthId(rawUser.auth_id);

    return user;
  }
}
