import { Equals, IsEmail, IsString } from 'class-validator';
import { AuthType } from '../user.entity';

export class LocalRegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @Equals(AuthType.Local)
  auth_type: AuthType;
}
