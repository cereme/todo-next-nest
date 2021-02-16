import { Equals, IsEmail, IsString } from 'class-validator';
import { AuthType } from '../user.entity';

export class BasicRegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @Equals(AuthType.Basic)
  auth_type: AuthType;
}
